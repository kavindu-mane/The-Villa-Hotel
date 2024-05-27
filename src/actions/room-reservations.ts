"use server";

import { ReservationsSchema } from "@/validations";
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
  createReservation,
  deleteReservation,
  getReservationById,
} from "@/actions/utils/reservations";
import { cookies } from "next/headers";

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

  if (roomAvailability) {
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
    if (existingReservation.status !== "Pending") {
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

    return {
      success: true,
      reservation: {
        room: {
          number: roomDetails.number,
          type: roomDetails.type,
        },
        amount: existingReservation.total,
      },
    };
  } else {
    // delete existing pending reservation
    if (reservation) {
      const existingReservation = await getReservationById(reservation.value);
      if (existingReservation && existingReservation.status === "Pending")
        await deleteReservation(reservation.value);
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
          await deleteReservation(newReservation.id);
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

      return {
        success: true,
        reservation: {
          room: {
            number: roomDetails.number,
            type: roomDetails.type,
          },
          amount: newReservation.total,
        },
      };
    } else {
      return {
        error: "Room not available",
      };
    }
  }
};
