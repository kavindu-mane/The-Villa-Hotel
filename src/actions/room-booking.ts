"use server";

import { BookingSchema } from "@/validations";
import z from "zod";
import { getAllRooms, getAvailableRooms } from "./utils/rooms";

/**
 * Server action for room booking form
 * @returns {object} - available rooms
 */

type roomTypes = "Deluxe" | "Superior" | "Standard";

export const roomBooking = async (values: z.infer<typeof BookingSchema>) => {
  // validate data in backend
  const validatedFields = BookingSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  // destructure data from validated fields
  const { date, room_type, persons } = validatedFields.data;

  // get available rooms
  const availableRooms = await getAvailableRooms(
    room_type as roomTypes,
    date.from,
    date.to,
  );

  // other available rooms
  const otherAvailableRooms = await getAvailableRooms(
    room_type as roomTypes,
    date.from,
    date.to,
  );

  // if no rooms available
  if (!availableRooms) {
    return {
      error: `No ${room_type} rooms available for the selected dates. `,
      other: otherAvailableRooms
        ? otherAvailableRooms
        : "No other rooms available.",
    };
  }

  // return available rooms
  return {
    rooms: availableRooms,
    other: otherAvailableRooms
      ? otherAvailableRooms
      : "No other rooms available.",
  };
};

export const getRoomsDetails = async () => {
  const rooms = await getAllRooms();

  return {
    rooms,
  };
};
