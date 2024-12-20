"use server";

import {
  CancelReservationSchema,
  RestaurantAvailabilitySchema,
  RestaurantReservationSchema,
} from "@/validations";
import z from "zod";
import {
  getAllTables,
  getAvailableTables,
  getTableByNumber,
} from "@/actions/utils/tables";
import {
  checkTableAvailability,
  deleteTableReservation,
  getTableReservationById,
  createTableReservation,
  updateTableReservation,
  getTableReservationByNumber,
} from "@/actions/utils/table-reservations";
import { cookies } from "next/headers";
import { getPromotionByCode, getPromotions } from "./utils/promotions";
import {
  updateFoodReservationStatus,
  updateFoodReservationTotals,
} from "./utils/foods";
import { tzConvertor } from "./utils/timezone-convertor";
import { getUserByEmail } from "./utils/user";
import { decreaseCoins, increaseCoins } from "./utils/coins";
import { tableReservationConfirmEmailTemplate } from "@/templates/table-reservation-confirm-email";
import { sendEmails } from "./utils/email";
import { getReservationCancelToken } from "./utils/tokens";
import { reservationCancellationTemplate } from "@/templates/reservation-cancellation";
import { getReservationCancelTokenByToken } from "./utils/reservation-cancellation-token";
import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { DEFAULT_MAX_COIN_PERCENTAGE } from "@/constants";

/**
 * Create action for table booking form
 * @returns - available tables
 */

export const getAllAvailableTables = async (
  values: z.infer<typeof RestaurantAvailabilitySchema>,
) => {
  // validate data in backend
  const validatedFields = RestaurantAvailabilitySchema.safeParse(values);

  //check if validation failed and return errors
  if (!validatedFields.success) {
    return { errors: validatedFields.error };
  }

  //destructure data from validated fields
  const { date, timeSlot } = validatedFields.data;

  // converted date
  const dateConverted = await tzConvertor(date);

  //get available tables
  const availableTables = await getAvailableTables(dateConverted, timeSlot);

  // return available tables
  return {
    availableTables,
  };
};

export const getTablesDetails = async () => {
  const tables = await getAllTables();

  return {
    tables,
  };
};

// create pending reservation for 15 minutes
export const createPendingTableReservation = async (
  availability: z.infer<typeof RestaurantAvailabilitySchema>,
  data: z.infer<typeof RestaurantReservationSchema>,
) => {
  // validate data in backend
  const validatedAvailabilityFields =
    RestaurantAvailabilitySchema.safeParse(availability);
  const validatedReservationFields =
    RestaurantReservationSchema.safeParse(data);

  //check if validation failed and return errors
  if (!validatedAvailabilityFields.success) {
    return { errors: validatedAvailabilityFields.error };
  }
  if (!validatedReservationFields.success) {
    return { errors: validatedReservationFields.error };
  }

  //destructure data from validated fields
  const { date, timeSlot } = validatedAvailabilityFields.data;
  const { table, name, email, phone } = validatedReservationFields.data;

  // convert date to ISO string
  const dateConverted = await tzConvertor(date);

  // get cookies
  const cookieStore = cookies();
  // check if room number is valid
  if (table === null) {
    return {
      error: "Invalid table number",
    };
  }

  //check if dates are valid
  if (dateConverted === null) {
    return {
      error: "Invalid date",
    };
  }

  // get table from table number
  const tableDetails = await getTableByNumber(table);

  if (!tableDetails) {
    return {
      error: "Table not found",
    };
  }

  // check if table is available or not
  const tableAvailability = await checkTableAvailability(
    table,
    dateConverted,
    timeSlot,
  );

  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_table_reservation");

  if (tableAvailability) {
    // if reservation cookie not exists
    if (!reservation) {
      return {
        error: "Table not available",
      };
    }
    // check if reservation exists
    const existingReservation = await getTableReservationById(
      reservation.value,
    );
    if (!existingReservation) {
      return {
        error: "Reservation not found",
      };
    }

    // check reservation status
    if (existingReservation.status !== "Ongoing") {
      return {
        error: "Reservation already exists",
      };
    }

    // check room numbers are mismatched
    if (existingReservation.tableId !== tableDetails.id) {
      return {
        error: "Table numbers mismatch",
      };
    }

    return {
      success: true,
    };
  } else {
    // delete existing pending reservation
    if (reservation) {
      const existingReservation = await getTableReservationById(
        reservation.value,
      );

      if (existingReservation && existingReservation.status === "Ongoing")
        await deleteTableReservation(reservation.value, "Ongoing");
    }

    // get user by email
    const user = await getUserByEmail(email);

    // create new pending reservation
    const newTableReservation = await createTableReservation({
      tableId: tableDetails.id,
      userId: user ? user.id : null,
      date,
      timeSlot,
      offerDiscount: 0,
      total: tableDetails.price,
      status: "Ongoing",
      type: "Online",
      name,
      email,
      phone,
    });

    if (newTableReservation) {
      // Set a timeout to delete the record after 15 minutes
      setTimeout(
        async () => {
          await deleteTableReservation(newTableReservation.id, "Ongoing");
        },
        15 * 60 * 1000,
      );

      // set cookie for 15 minutes
      cookies().set("pending_table_reservation", newTableReservation.id, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });

      return {
        success: true,
      };
    } else {
      return {
        error: "Table not available",
      };
    }
  }
};

// complete table reservation
export const completeTableReservation = async (offerID?: string) => {
  // get cookies
  const cookieStore = cookies();
  // session
  const session = await getSession();
  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_table_reservation");
  // offer details
  let offer = null;
  // user details
  let user = null;
  let coins = 0;
  let availableCoins = 0;
  let usedCoins = 0;
  let maximumCoinsAllowed = 0;

  if (!reservation) {
    return {
      error: "Reservation not found",
    };
  }

  // check if reservation exists
  const existingReservation = await getTableReservationById(reservation.value);

  if (!existingReservation) {
    return {
      error: "Reservation not found",
    };
  }

  // sub total
  let subTotal = existingReservation.total;
  let offerAmount = 0;

  // check if reservation status is pending
  if (existingReservation.status !== "Ongoing") {
    return {
      error: "Reservation already exists",
    };
  }

  if (offerID) {
    // get offer details by offer ID
    offer = await getPromotionByCode(offerID);
    if (!offer) {
      return {
        error: "Offer not found",
      };
    }
  }

  // get authenticated user
  if (session?.user?.email) {
    user = await getUserByEmail(session?.user?.email);
    // get user coins
    coins = user?.coins || 0;
    // set available coins
    availableCoins = coins;
    // get maximum coins allowed
    maximumCoinsAllowed = Math.floor(
      existingReservation.total * DEFAULT_MAX_COIN_PERCENTAGE,
    );
    // if user's coins are grater than maximum coins allowed update coins to maximum coins allowed
    if (coins > maximumCoinsAllowed) {
      coins = maximumCoinsAllowed;
    }
  }

  // calculate total after discount
  let total =
    (existingReservation.total * (100 - (offer?.discount || 0))) / 100 -
    coins / 100;
  // total  value rounded to 2 decimal places
  total = Math.round(total * 100) / 100;
  subTotal = total;
  // if offer exists calculate offer amount
  if (offer) offerAmount = existingReservation.total - total;

  // update reservation with offer details
  await updateTableReservation(existingReservation.id, {
    total,
    offerId: offer?.id,
    coins,
  });

  // updated used coins
  usedCoins += coins;
  // update available coins
  availableCoins -= coins;

  if (existingReservation.foodReservation) {
    const menu = existingReservation.foodReservation.foodReservationItems;
    // food array
    const foodArray: {
      foodId: string;
      quantity: number;
      foodReservationId: string;
      total: number;
      offerId: string | null;
      coins: number;
      offerDiscount: number;
    }[] = [];

    // loop through menu and create food array
    menu.forEach(async (item) => {
      // return if food reservation id undefined
      if (!existingReservation.foodReservation?.id) {
        return;
      }
      maximumCoinsAllowed = Math.floor(
        item.total * DEFAULT_MAX_COIN_PERCENTAGE,
      );
      coins = availableCoins;
      // if user's coins are grater than maximum coins allowed update coins to maximum coins allowed
      if (coins > maximumCoinsAllowed) {
        coins = maximumCoinsAllowed;
      }
      let total =
        (item.total * (100 - (offer?.discount || 0))) / 100 - coins / 100;
      total = Math.round(total * 100) / 100;
      subTotal += total;
      // update offer amount if offer exists
      if (offer) offerAmount += item.total * (offer?.discount || 0);
      foodArray.push({
        foodReservationId: existingReservation.foodReservation?.id,
        foodId: item.foodId,
        quantity: item.quantity,
        total: total,
        offerDiscount: offer?.discount || 0,
        offerId: offer?.id || null,
        coins,
      });
      //  update available coins
      availableCoins -= coins;
      // update used coins
      usedCoins += coins;
    });

    // update food reservation with offer details
    const updatedFoodReservation = await updateFoodReservationTotals(
      existingReservation.foodReservation.id,
      foodArray,
    );

    if (!updatedFoodReservation) {
      return {
        error: "Error adding food reservation",
      };
    }
  }

  // update reservation status to confirm
  await updateTableReservation(existingReservation.id, {
    status: "Confirmed",
  });
  // update food reservation status to confirm
  if (existingReservation.foodReservation) {
    await updateFoodReservationStatus(
      existingReservation.foodReservation.id,
      "Confirmed",
    );
  }

  // if user authenticated, increase coins
  if (existingReservation.userId) {
    // get bottom int value of subTotal
    const coins = Math.floor(subTotal);
    // decrease coins
    await decreaseCoins(existingReservation.userId, usedCoins);
    // increase coins
    await increaseCoins(existingReservation.userId, coins);
  }

  // delete pending_reservation cookie
  cookieStore.delete("pending_table_reservation");

  // coin value rounded to 2 decimal places
  const coinValue = usedCoins / 100;

  // setup email template
  const template = tableReservationConfirmEmailTemplate(
    existingReservation.name || "",
    existingReservation.reservationNo,
    existingReservation.date.toDateString(),
    existingReservation.timeSlot,
    (offerAmount + subTotal + coinValue).toFixed(2),
    offerAmount.toFixed(2),
    coinValue.toFixed(2),
    subTotal.toFixed(2),
    `${process.env.DOMAIN}/view-reservations?table=${existingReservation.reservationNo}`,
    existingReservation.table.tableType,
    existingReservation.table.tableId,
    existingReservation.total.toFixed(2),
    existingReservation.foodReservation
      ? existingReservation.foodReservation.foodReservationItems
      : [],
  );

  //get reply to email from env
  const replyTo = process.env.CONTACT_US_EMAIL;

  const isSend = await sendEmails({
    to: existingReservation.email!!,
    replyTo,
    subject: "Reservation Confirmation - The Villa Hotel",
    body: template,
  });

  // if email not sent
  if (!isSend) {
    return {
      error: "Order confirmed but email not sent",
    };
  }

  return {
    success: true,
  };
};

// get table reservation by reservation number
export const getReservationDetails = async (reservationNo: number) => {
  // check if reservation number is valid
  if (!reservationNo) {
    return {
      status: 404,
      error: "Invalid reservation number",
    };
  }

  const reservation = await getTableReservationByNumber(reservationNo);

  if (!reservation) {
    return {
      status: 404,
      error: "Reservation not found",
    };
  }

  // calculate sub total
  let subTotal = reservation.total;
  let total = reservation.total === 0 ? 0 : reservation.table.price;
  let offerAmount = 0;
  let coinAmount = 0;
  const offerPercentage =
    reservation.offerDiscount > (reservation.offer?.discount || 0)
      ? reservation.offerDiscount
      : reservation.offer?.discount || 0;

  // offer amount
  offerAmount = (total * offerPercentage) / 100;
  // coin amount
  coinAmount = reservation.coins / 100;

  // check if food reservation exists
  if (reservation.foodReservation) {
    reservation.foodReservation.foodReservationItems.map((item) => {
      const offer = (item.food.price * item.quantity * offerPercentage) / 100;
      const coin = item.coins / 100;
      total += item.food.price * item.quantity;
      offerAmount += offer;
      coinAmount += coin;
      subTotal += item.total;
    });
  }

  return {
    success: true,
    reservation: {
      reservationNo: reservation.reservationNo,
      date: reservation.date,
      timeSlot: reservation.timeSlot,
      name: reservation.name,
      email: reservation.email,
      table: {
        number: reservation.table.tableId,
        type: reservation.table.tableType,
      },
      total,
      tablesTotal: reservation.total === 0 ? 0 : reservation.table.price,
      offerPercentage,
      offer: offerAmount,
      coin: coinAmount,
      subTotal,
      foods: reservation.foodReservation?.foodReservationItems,
      status: reservation.status,
    },
  };
};

// request table reservation cancellation with otp token
export const requestTableReservationCancellation = async (
  reservationNo: number,
) => {
  // check if reservation number is valid
  if (!reservationNo) {
    return {
      status: 404,
      error: "Invalid reservation number",
    };
  }

  const reservation = await getTableReservationByNumber(reservationNo);

  if (!reservation) {
    return {
      status: 404,
      error: "Reservation not found",
    };
  }

  // check if reservation status is pending
  if (reservation.status !== "Confirmed") {
    return {
      error: "Reservation already cancelled",
    };
  }

  // generate cancel token
  const cancelToken = await getReservationCancelToken(reservation.id, "table");

  // if token not generated
  if (!cancelToken) {
    return {
      error: "Error generating token",
    };
  }

  // setup email template
  const template = reservationCancellationTemplate(
    cancelToken.token,
    reservation.name || "",
  );

  //get reply to email from env
  const replyTo = process.env.CONTACT_US_EMAIL;
  // send email
  const isSend = await sendEmails({
    to: reservation.email!!,
    replyTo,
    subject: "Reservation Cancellation - The Villa Hotel",
    body: template,
  });

  // if email not sent
  if (!isSend) {
    return {
      error: "Token generated but email not sent",
    };
  }

  return {
    success: true,
    message: "Token generated and email sent",
  };
};

// cancel table reservation
export const cancelTableReservation = async (
  data: z.infer<typeof CancelReservationSchema>,
) => {
  // validate data in backend
  const validatedFields = CancelReservationSchema.safeParse(data);
  //check if validation failed and return errors
  if (!validatedFields.success) {
    return { errors: validatedFields.error.errors };
  }

  //destructure data from validated fields
  const { reservationNo, token } = validatedFields.data;

  // check if reservation number is valid
  if (!reservationNo) {
    return {
      status: 404,
      error: "Invalid reservation number",
    };
  }

  const reservation = await getTableReservationByNumber(reservationNo);

  if (!reservation) {
    return {
      status: 404,
      error: "Reservation not found",
    };
  }

  // check if reservation status is pending
  if (reservation.status !== "Confirmed") {
    console.log(reservation.status);
    return {
      error: "Reservation already cancelled",
    };
  }

  // check if token is valid
  const tokenValid = await getReservationCancelTokenByToken(
    token,
    reservation.id,
  );

  if (!tokenValid) {
    return {
      error: "Invalid token",
    };
  }

  // delete token
  await db.reservationCancelToken.deleteMany({
    where: {
      token,
      tableReservationId: reservation.id,
    },
  });

  // update reservation status to cancel
  await updateTableReservation(reservation.id, {
    status: "Cancelled",
  });

  // update food reservation status to cancel
  if (reservation.foodReservation) {
    await updateFoodReservationStatus(
      reservation.foodReservation.id,
      "Cancelled",
    );
  }

  return {
    success: true,
    message: "Reservation cancelled",
  };
};
