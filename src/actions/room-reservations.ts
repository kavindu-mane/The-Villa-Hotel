"use server";

import {
  CancelReservationSchema,
  ReservationsSchema,
  RoomReservationFormSchema,
} from "@/validations";
import z from "zod";
import {
  getAllRooms,
  getAvailableRooms,
  getOtherAvailableRooms,
  getRoomByNumber,
} from "@/actions/utils/rooms";
import { RoomType } from "@prisma/client";
import {
  checkRoomAvailability,
  confirmReservations,
  createReservation,
  deleteReservation,
  getReservationById,
  getReservationByNumber,
  updateReservationStatus,
} from "@/actions/utils/room-reservations";
import { cookies } from "next/headers";
import { getPromotionByCode, getPromotions } from "./utils/promotions";
import { updateReservation } from "./admin/utils/rooms-reservation-admin";
import md5 from "md5";
import { getUserByEmail } from "./utils/user";
import { addPaymentRecord } from "./utils/payments";
import { roomReservationConfirmEmailTemplate } from "@/templates/room-reservation-confirm-email";
import { sendEmails } from "./utils/email";
import { decreaseCoins, increaseCoins } from "./utils/coins";
import { getReservationCancelToken } from "./utils/tokens";
import { reservationCancellationTemplate } from "@/templates/reservation-cancellation";
import { getReservationCancelTokenByToken } from "./utils/reservation-cancellation-token";
import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { DEFAULT_MAX_COIN_PERCENTAGE } from "@/constants";

/**
 * Server action for room booking form
 * @returns - available rooms
 */

export const getAllAvailableRooms = async (
  values: z.infer<typeof ReservationsSchema>,
) => {
  // validate data in backend
  const validatedFields = ReservationsSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  // destructure data from validated fields
  const { date, room_type } = validatedFields.data;

  // get available rooms
  const availableRooms = await getAvailableRooms(
    room_type as RoomType,
    date.from,
    date.to,
  );

  // other available rooms
  const otherAvailableRooms = await getOtherAvailableRooms(
    room_type as RoomType,
    date.from,
    date.to,
  );

  const error =
    availableRooms === null || availableRooms.length === 0
      ? `No ${room_type} rooms available for the selected dates.`
      : null;
  const otherError =
    otherAvailableRooms === null || otherAvailableRooms.length === 0
      ? "No other rooms available"
      : null;

  // if no rooms available
  return {
    error: error,
    otherError: otherError,
    rooms: availableRooms,
    other: otherAvailableRooms,
  };
};

export const getRoomsDetails = async () => {
  const rooms = await getAllRooms();

  return {
    rooms,
  };
};

// create pending reservation for 15 minutes
export const createPendingReservation = async (
  roomNumber: number,
  checkIn: Date,
  checkOut: Date,
) => {
  // get cookies
  const cookieStore = cookies();
  // session
  const session = await getSession();
  // check if room number is valid
  if (roomNumber === null) {
    return {
      error: "Invalid room number",
    };
  }

  // check if dates are valid
  if (checkIn === null || checkOut === null) {
    return {
      error: "Invalid dates",
    };
  }

  // get room from room number
  const roomDetails = await getRoomByNumber(roomNumber);

  if (!roomDetails) {
    return {
      error: "Room not found",
    };
  }

  // check if room is available or not
  const roomAvailability = await checkRoomAvailability(
    roomDetails.id,
    checkIn,
    checkOut,
  );

  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_reservation");

  // get available offers
  const offers = await getPromotions(1, 5, {
    code: true,
    description: true,
    discount: true,
  });
  let coins = 0;

  // get authenticated user
  if (session?.user?.email) {
    const user = await getUserByEmail(session?.user?.email);
    // get user coins
    coins = user?.coins || 0;
  }

  if (roomAvailability && roomAvailability?.length > 0) {
    // if reservation cookie not exists
    if (!reservation) {
      return {
        error: "Room not available",
      };
    }
    // check if reservation exists
    const existingReservation = await getReservationById(reservation.value);
    if (!existingReservation) {
      return {
        error: "Reservation not found",
      };
    }

    // check reservation status
    if (
      existingReservation.status !== "Pending" &&
      existingReservation.status !== "Ongoing"
    ) {
      return {
        error: "Reservation already exists",
      };
    }

    // check room numbers are mismatched
    if (existingReservation.roomId !== roomDetails.id) {
      return {
        error: "Room numbers mismatch",
      };
    }

    // calculate maximum coins
    const maximumCoinsAllowed =
      Math.floor(existingReservation.total) * DEFAULT_MAX_COIN_PERCENTAGE;
    // if user's coins are grater than maximum coins allowed update coins to maximum coins allowed
    if (coins > maximumCoinsAllowed) {
      coins = maximumCoinsAllowed;
    }

    return {
      success: true,
      reservation: {
        room: {
          number: roomDetails.number,
          type: roomDetails.type,
        },
        amount: existingReservation.total,
        offers: offers?.offers || [],
        coins,
      },
    };
  } else {
    // delete existing pending reservation
    if (reservation) {
      const existingReservation = await getReservationById(reservation.value);
      if (existingReservation && existingReservation.status === "Pending")
        await deleteReservation(reservation.value, "Pending");
      if (existingReservation && existingReservation.status === "Ongoing")
        await deleteReservation(reservation.value, "Ongoing");
    }
    // calculate total amount
    const totalAmount =
      roomDetails.price *
      Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24));
    // create new pending reservation
    const newReservation = await createReservation({
      roomId: roomDetails.id,
      offerDiscount: 0,
      checkIn: checkIn,
      checkOut: checkOut,
      total: totalAmount,
      status: "Pending",
      type: "Online",
    });

    if (newReservation) {
      // Set a timeout to delete the record after 15 minutes
      setTimeout(
        async () => {
          await deleteReservation(newReservation.id, "Pending");
        },
        15 * 60 * 1000,
      );

      // set cookie for 15 minutes
      cookies().set("pending_reservation", newReservation.id, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 15 * 60 * 1000),
      });

      // calculate maximum coins
      const maximumCoinsAllowed =
        Math.floor(totalAmount) * DEFAULT_MAX_COIN_PERCENTAGE;
      // if user's coins are grater than maximum coins allowed update coins to maximum coins allowed
      if (coins > maximumCoinsAllowed) {
        coins = maximumCoinsAllowed;
      }

      return {
        success: true,
        reservation: {
          room: {
            number: roomDetails.number,
            type: roomDetails.type,
          },
          amount: newReservation.total,
          offers: offers?.offers || [],
          coins,
        },
      };
    } else {
      return {
        error: "Room not available",
      };
    }
  }
};

// generate payment keys for pending reservation
export const generatePaymentKeys = async (
  values: z.infer<typeof RoomReservationFormSchema>,
) => {
  // get cookies
  const cookieStore = cookies();
  // session
  const session = await getSession();
  // validate data in backend
  const validatedFields = RoomReservationFormSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  // destructure data from validated fields
  const { beds, email, name, phone, offerID } = validatedFields.data;

  if (!email || !name || !phone) {
    return {
      error: "Invalid user details",
    };
  }

  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_reservation");

  // if reservation cookie not exists
  if (!reservation) {
    return {
      error: "Reservation not found",
    };
  }

  // check if reservation exists
  const existingReservation = await updateReservationStatus(
    reservation.value,
    "Ongoing",
  );

  if (!existingReservation) {
    return {
      error: "Reservation not found",
    };
  }

  // extend cookie time for 15 minutes
  cookieStore.set("pending_reservation", reservation.value, {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    expires: new Date(Date.now() + 15 * 60 * 1000),
  });

  // Set a timeout to delete the record after 15 minutes
  setTimeout(
    async () => {
      await deleteReservation(existingReservation.id, "Ongoing");
    },
    15 * 60 * 1000,
  );

  // get promotion from code
  let offerPercentage = 0;
  let offer = null;
  if (offerID) {
    const promotion = await getPromotionByCode(offerID);
    if (!promotion) {
      return {
        error: "Invalid promotion code",
      };
    }
    offerPercentage = promotion.discount;
    offer = promotion.id;
  }

  let user = null;
  let coins = 0;

  // get authenticated user
  if (session?.user?.email) {
    user = await getUserByEmail(session?.user?.email);
    // get user coins
    coins = user?.coins || 0;
    // get maximum coins allowed
    const maximumCoinsAllowed = Math.floor(
      existingReservation.total * DEFAULT_MAX_COIN_PERCENTAGE,
    );
    // if user's coins are grater than maximum coins allowed update coins to maximum coins allowed
    if (coins > maximumCoinsAllowed) {
      coins = maximumCoinsAllowed;
    }
  }

  // calculate total amount
  let totalAmount =
    existingReservation.total -
    coins / 100 -
    (offerPercentage * existingReservation.total) / 100;
  totalAmount = Math.round(totalAmount * 100) / 100;

  // update reservation with user details
  const updatedReservation = await updateReservation({
    id: existingReservation.id,
    roomId: existingReservation.roomId,
    bed: beds,
    name,
    email,
    phone,
    checkIn: existingReservation.checkIn,
    checkOut: existingReservation.checkOut,
    total: totalAmount,
    coins,
    offerId: offer,
    userId: user ? user.id : null,
  });

  // if update unsuccessful
  if (!updatedReservation) {
    return {
      error: "Failed to make reservation",
    };
  }

  // generate payment credentials and return
  const hash = md5(
    process.env.PAYHERE_MERCHANT_ID!! +
      updatedReservation.reservationNo +
      (totalAmount * 0.1).toFixed(2) +
      "USD" +
      md5(process.env.PAYHERE_SECRET!!).toUpperCase(),
  ).toUpperCase();

  return {
    success: true,
    payment: {
      merchant_id: process.env.PAYHERE_MERCHANT_ID!!,
      return_url: process.env.PAYHERE_RETURN_URL!!,
      cancel_url: process.env.PAYHERE_CANCEL_URL!!,
      notify_url: process.env.PAYHERE_NOTIFY_URL!!,
      order_id: updatedReservation.reservationNo,
      items: "Room Reservation - " + updatedReservation.reservationNo,
      currency: "USD",
      amount: (totalAmount * 0.1).toFixed(2),
      first_name: name,
      last_name: "",
      email: email,
      phone: phone,
      address: "",
      city: "",
      country: "",
      hash: hash,
    },
  };
};

// complete payment and update reservation status
export const completePayment = async (order_id: number, payment: number) => {
  // check if order_id is valid
  if (!order_id) {
    return {
      error: "Invalid order id",
    };
  }

  // get reservation by order_id
  const reservation = await getReservationByNumber(order_id);

  // check if reservation exists
  if (!reservation) {
    return {
      error: "Reservation not found",
    };
  }

  // update reservation status
  const updatedReservation = await confirmReservations(reservation.id, payment);

  // if update unsuccessful
  if (!updatedReservation) {
    return {
      error: "Failed to confirm reservation",
    };
  }
  // if user authenticated, increase coins
  if (updatedReservation.userId) {
    // decrease coins from user
    await decreaseCoins(updatedReservation.userId, updatedReservation.coins);
    // get bottom int value of subTotal
    const coins = Math.floor(updatedReservation.total);
    // increase coins
    await increaseCoins(updatedReservation.userId, coins);
  }

  // add payment record to database
  const paymentRecord = await addPaymentRecord(
    updatedReservation.id,
    payment,
    "Online",
  );

  // if payment record not added
  if (!paymentRecord) {
    return {
      error: "Failed to add payment record",
    };
  }

  // remove pending_reservation cookie
  cookies().delete("pending_reservation");

  // calculate offer value
  const offerValue =
    (reservation.total * (updatedReservation.offer?.discount || 0)) / 100;
  // calculate coin value
  const coinValue = updatedReservation.coins / 100;

  // setup email template
  const template = roomReservationConfirmEmailTemplate(
    updatedReservation.name || "",
    updatedReservation.reservationNo,
    updatedReservation.checkIn.toDateString(),
    updatedReservation.checkOut.toDateString(),
    updatedReservation.total.toFixed(2),
    offerValue.toFixed(2),
    coinValue.toFixed(2),
    payment.toFixed(2),
    (updatedReservation.total - payment).toFixed(2),
    `${process.env.DOMAIN}/view-reservations?room=${updatedReservation.reservationNo}`,
    updatedReservation.room.type,
    updatedReservation.room.number,
  );

  //get reply to email from env
  const replyTo = process.env.CONTACT_US_EMAIL;

  const isSend = await sendEmails({
    to: updatedReservation.email!!,
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

// get reservation details by reservation number
export const getReservationDetails = async (reservationNo: number) => {
  // check if reservation number is valid
  if (!reservationNo) {
    return {
      status: 404,
      error: "Invalid reservation number",
    };
  }

  // get reservation by reservation number
  const reservation = await getReservationByNumber(reservationNo);

  // check if reservation exists
  if (!reservation) {
    return {
      status: 404,
      error: "Reservation not found",
    };
  }

  // calculate sub total
  const duration = Math.ceil(
    (reservation.checkOut.getTime() - reservation.checkIn.getTime()) /
      (1000 * 3600 * 24),
  );
  let subTotal = reservation.total;
  let total = reservation.room.price * duration;
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

  // return reservation details
  return {
    success: true,
    reservation: {
      reservationNo: reservation.reservationNo,
      room: {
        number: reservation.room.number,
        type: reservation.room.type,
      },
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      name: reservation.name,
      email: reservation.email,
      total,
      roomTotal: reservation.room.price * duration,
      offer: offerAmount,
      offerPercentage,
      coin: coinAmount,
      payed: reservation.paidAmount,
      pending: subTotal - reservation.paidAmount,
      subTotal,
      foods: reservation.foodReservation?.foodReservationItems,
      status: reservation.status,
    },
  };
};

// request room reservation cancellation with otp token
export const requestRoomReservationCancellation = async (
  reservationNo: number,
) => {
  // check if reservation number is valid
  if (!reservationNo) {
    return {
      status: 404,
      error: "Invalid reservation number",
    };
  }

  const reservation = await getReservationByNumber(reservationNo);

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
  const cancelToken = await getReservationCancelToken(reservation.id, "room");

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

// cancel reservation
export const cancelRoomReservation = async (
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
      error: "Invalid reservation number",
    };
  }

  // get reservation by reservation number
  const reservation = await getReservationByNumber(reservationNo);

  // check if reservation exists
  if (!reservation) {
    return {
      error: "Reservation not found",
    };
  }

  // check if reservation status is pending
  if (reservation.status !== "Confirmed") {
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
      roomReservationId: reservation.id,
    },
  });

  // update reservation status
  const updatedReservation = await updateReservationStatus(
    reservation.id,
    "Cancelled",
  );

  // if update unsuccessful
  if (!updatedReservation) {
    return {
      error: "Failed to cancel reservation",
    };
  }

  // remove pending_reservation cookie
  cookies().delete("pending_reservation");

  return {
    success: true,
    message: "Reservation cancelled successfully",
  };
};
