"use server";
import { z } from "zod";
import { RoomReservationFormSchema } from "@/validations";
import {
  getReservations,
  updateReservation,
} from "@/actions/admin/utils/rooms-reservation-admin";
import {
  checkRoomAvailability,
  createReservation,
  getReservationByNumber,
} from "@/actions/utils/reservations";
import { getRoomByNumber } from "@/actions/utils/rooms";
import { getUserByEmail } from "@/actions/utils/user";
import { tzConvertor } from "@/actions/utils/timezone-convertor";
import { getOfferById } from "../utils/offer";

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
    const { room, beds, offer, name, email, phone, date, offerID } =
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
    const user = await getUserByEmail(email!!);

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

    let commonOffer = null;
    // if offer id is exist
    if (offerID) {
      commonOffer = await getOfferById(offerID);
      if (!commonOffer) {
        return {
          error: "Offer not found",
        };
      }
    }

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
        {
          id: currentReservation.id,
          roomId: roomDetails.id,
          bed: beds,
          name: name || "",
          email: email || "",
          phone: phone || "",
          checkIn: fromDate,
          checkOut: toDate,
          total,
        },
        commonOffer?.discount || offer || 0,
      );
    } else {
      reservation = await createReservation({
        roomId: roomDetails.id,
        userId: user?.id || null,
        bed: beds,
        offerDiscount: commonOffer?.discount || offer || 0,
        name: name || null,
        email: email || null,
        phone: phone || null,
        checkIn: fromDate,
        checkOut: toDate,
        total,
        status: "Confirmed",
        type: "Offline",
        offerId: offerID || null,
      });
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
