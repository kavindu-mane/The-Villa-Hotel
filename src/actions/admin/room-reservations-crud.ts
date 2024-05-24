"use server";
import { z } from "zod";
import { RoomReservationFormSchema } from "@/validations";
import {
  checkRoomAvailability,
  createReservation,
  getReservationByNumber,
  getReservations,
  updateReservation,
} from "./utils/rooms-reservation-admin";
import { getRoomByNumber } from "../utils/rooms";
import { getUserByEmail } from "../utils/user";
import { tzConvertor } from "../utils/timezone-convertor";

/**
 * Server action for room reservation crud operations
 * @role admin
 */

export const getRoomReservationsData = async (page: number) => {
  try {
    const reservations = await getReservations(page, 10);

    // if failed to get reservations data
    if (!reservations) {
      return {
        reservations: null,
      };
    }

    // return reservations data
    return {
      reservations,
    };
  } catch (error) {
    return {
      error: "Failed to get reservations data",
    };
  }
};

export const addOrUpdateRoomReservation = async (
  values: z.infer<typeof RoomReservationFormSchema>,
  isUpdate: boolean,
  page: number = 1,
  reservationNo?: number,
) => {
  try {
    // validate data in backend
    const validatedFields = RoomReservationFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data from validated fields
    const { room, beds, offer, name, email, phone, date } =
      validatedFields.data;

    const fromDate = await tzConvertor(date.from);
    const toDate = await tzConvertor(date.to);

    // get room from room number
    const roomDetails = await getRoomByNumber(room);

    if (!roomDetails) {
      return {
        error: "Room not found",
      };
    }

    // get user from email
    const user = await getUserByEmail(email);

    // check if room is available or not
    const roomAvailability = await checkRoomAvailability(
      roomDetails.id,
      fromDate,
      toDate,
    );

    if (
      (roomAvailability && !isUpdate) ||
      (isUpdate &&
        roomAvailability &&
        roomAvailability.reservationNo !== reservationNo)
    ) {
      return {
        error: "Room is not available",
      };
    }

    // calculate total amount
    const differenceInTime = toDate.getTime() - fromDate.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (differenceInDays < 1) {
      differenceInDays = 1;
    }
    const total = roomDetails.price * differenceInDays;
    let reservation = null;

    // if update reservation
    if (isUpdate) {
      if (!reservationNo) {
        return {
          error: "Reservation ID is required",
        };
      }

      // check reservation is available or not
      const currentReservation = await getReservationByNumber(reservationNo);

      if (!currentReservation) {
        return {
          error: "Reservation not found",
        };
      }

      reservation = await updateReservation(
        currentReservation.id,
        roomDetails.id,
        beds,
        offer || 0,
        name,
        email,
        phone,
        fromDate,
        toDate,
        total,
      );
    } else {
      reservation = await createReservation(
        roomDetails.id,
        user?.id || null,
        beds,
        offer || 0,
        name,
        email,
        phone,
        fromDate,
        toDate,
        total,
      );
    }

    // if failed to add or update reservation
    if (!reservation) {
      return {
        error: "Failed to add or update reservation",
      };
    }

    // get updated reservations data
    const reservations = await getReservations(page, 10);

    //return success message
    return {
      success: "Reservation added/update successfully",
      data: reservations,
    };
  } catch (error) {
    return {
      error: "Failed to add or update reservation",
    };
  }
};
