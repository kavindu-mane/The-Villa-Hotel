"use server";

import {
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
} from "@/actions/utils/table-reservations";
import { cookies } from "next/headers";
import { getPromotionByCode, getPromotions } from "./utils/promotions";
import {
  updateFoodReservationStatus,
  updateFoodReservationTotals,
} from "./utils/foods";
import { tzConvertor } from "./utils/timezone-convertor";

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
    // create new pending reservation
    const newTableReservation = await createTableReservation({
      tableId: tableDetails.id,
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
  // check pending_reservation cookie if exists
  const reservation = cookieStore.get("pending_table_reservation");

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

  // check if reservation status is pending
  if (existingReservation.status !== "Ongoing") {
    return {
      error: "Reservation already exists",
    };
  }

  if (offerID) {
    // get offer details by offer ID
    const offer = await getPromotionByCode(offerID);
    if (!offer) {
      return {
        error: "Offer not found",
      };
    }

    // calculate total after discount
    const total = (existingReservation.total * (100 - offer.discount)) / 100;

    // update reservation with offer details
    await updateTableReservation(existingReservation.id, {
      offerDiscount: offer.discount,
      total,
    });

    if (existingReservation.foodReservation[0]) {
      // food array
      const foodArray: {
        foodId: string;
        quantity: number;
        total: number;
        offerId: string;
        offerDiscount: number;
      }[] = [];
      const menu = existingReservation.foodReservation[0].foodReservationItems;

      // loop through menu and create food array
      menu.forEach(async (item) => {
        const total = (item.total * (100 - offer.discount)) / 100;
        foodArray.push({
          foodId: item.foodId,
          quantity: item.quantity,
          total: total,
          offerId: offer.id,
          offerDiscount: offer.discount,
        });
      });

      // update food reservation with offer details
      const updatedFoodReservation = await updateFoodReservationTotals(
        existingReservation.foodReservation[0].id,
        foodArray,
      );

      if (!updatedFoodReservation) {
        return {
          error: "Error updating food reservation",
        };
      }
    }
  }

  // update reservation status to confirm
  await updateTableReservation(existingReservation.id, {
    status: "Confirmed",
  });
  // update food reservation status to confirm
  if (existingReservation.foodReservation[0]) {
    await updateFoodReservationStatus(
      existingReservation.foodReservation[0].id,
      "Confirmed",
    );
  }

  // delete pending_reservation cookie
  cookieStore.delete("pending_table_reservation");

  return {
    success: true,
  };
};
