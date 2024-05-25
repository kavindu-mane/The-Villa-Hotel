"use server";

import { BookingSchema } from "@/validations";
import z from "zod";
import { getAllRooms, getAvailableRooms, getOtherAvailableRooms } from "./utils/rooms";
import { RoomType } from "@prisma/client";

/**
 * Server action for room booking form
 * @returns - available rooms
 */

export const getAllAvailableRooms = async (
  values: z.infer<typeof BookingSchema>,
) => {
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
