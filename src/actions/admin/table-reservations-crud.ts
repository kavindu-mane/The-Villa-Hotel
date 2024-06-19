"use server";

import { z } from "zod";
import { TableReservationFormSchema } from "@/validations";
import {
  getTableReservations,
  updateTableReservation,
} from "@/actions/admin/utils/tables-reservation-admin";
import {
  checkTableAvailability,
  getTableReservationByNumber,
  createTableReservation,
} from "@/actions/utils/table-reservations";
import { getTableByNumber } from "@/actions/utils/tables";
import { getUserByEmail } from "@/actions/utils/user";
import { tzConvertor } from "@/actions/utils/timezone-convertor";
import { getPromotionByCode } from "../utils/promotions";
import { DEFAULT_PAGINATION_SIZE } from "@/constants";

/**
 * Server action for table reservation crud operations
 * @role admin
 */

export const getTableReservationsData = async (page: number) => {
  try {
    const reservations = await getTableReservations(
      page,
      DEFAULT_PAGINATION_SIZE,
    );

    // if failed to get reservations data
    if (!reservations) {
      return {
        reservations: null,
      };
    }

    // return reservations data
    return {
      reservations: reservations.tableReservations,
      totalPages: reservations.pages,
      currentPage: reservations.page,
    };
  } catch (error) {
    return {
      error: "Failed to get reservations data",
    };
  }
};

export const addOrUpdateTableReservation = async (
  values: z.infer<typeof TableReservationFormSchema>,
  isUpdate: boolean,
  reservationNo?: number,
) => {
  try {
    // validate data in backend
    const validatedFields = TableReservationFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data from validated fields
    const { tableId, name, email, phone, date, timeSlot, offerID, offer } =
      validatedFields.data;

    const tableDate = await tzConvertor(date);

    // get table from table number
    const tableDetails = await getTableByNumber(tableId);

    if (!tableDetails) {
      return {
        error: "Table not found",
      };
    }

    // get user from email
    const user = await getUserByEmail(email!!);

    console.log(tableDetails.tableId, tableDate, timeSlot);

    // check if table is available or not
    const tableAvailability = await checkTableAvailability(
      tableDetails.id,
      tableDate,
      timeSlot,
    );

    if (
      (tableAvailability && !isUpdate) ||
      (isUpdate &&
        tableAvailability &&
        tableAvailability.reservationNo !== reservationNo)
    ) {
      return {
        error: "Table is not available",
      };
    }

    // calculate total amount
    const total = tableDetails.price;
    let reservation = null;

    let commonOffer = null;
    // if offer id is exist
    if (offerID) {
      commonOffer = await getPromotionByCode(offerID);
      if (!commonOffer) {
        return {
          error: "Offer not found",
        };
      }
    }

    const finalizedTotal =
      ((100 - (commonOffer?.discount || offer || 0)) * total) / 100;

    // if update table reservation
    if (isUpdate) {
      if (!reservationNo) {
        return {
          error: "Reservation ID is required",
        };
      }

      // check table reservation is available or not
      const currentReservation =
        await getTableReservationByNumber(reservationNo);

      if (!currentReservation) {
        return {
          error: "Reservation not found",
        };
      }

      reservation = await updateTableReservation(
        {
          id: currentReservation.id,
          tableId: tableDetails.id,
          name: name || "",
          email: email || "",
          phone: phone || "",
          date: tableDate,
          userId: user?.id || null,
          total: finalizedTotal,
          timeSlot: timeSlot,
        },
        commonOffer?.discount || offer || 0,
      );
    } else {
      reservation = await createTableReservation({
        tableId: tableDetails.id,
        name: name,
        email: email,
        phone: phone,
        date: tableDate,
        userId: user?.id || null,
        total: finalizedTotal,
        timeSlot: timeSlot,
        offerDiscount: commonOffer?.discount || offer || 0,
        offerId: offerID || null,
        status: "Confirmed",
        type: "Offline",
        coins: 0,
        foodReservationsId: null,
      });
    }

    // if failed to add or update reservation
    if (!reservation) {
      return {
        error: "Failed to add or update table reservation",
      };
    }

    // get updated table reservations data
    const reservations = await getTableReservations(
      Infinity,
      DEFAULT_PAGINATION_SIZE,
    );

    //return success message
    return {
      success: "table Reservation added/updated successfully",
      data: reservations?.tableReservations || [],
    };
  } catch (error) {
    return {
      error: "Failed to add or update table reservation",
    };
  }
};
