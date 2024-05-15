"use server";

import { z } from "zod";
import { createRoom, getRoomById, getRooms } from "./utils/rooms-admin";
import { RoomFormSchema } from "@/validations";

/**
 * Server action for room crud operations
 * @role admin
 */

export const getRoomsData = async (page: number) => {
  try {
    const rooms = await getRooms(page, 10);

    // if failed to get rooms data
    if (!rooms) {
      return {
        rooms: null,
      };
    }

    // return rooms data
    return {
      rooms,
    };
  } catch (error) {
    return {
      error: "Failed to get rooms data",
    };
  }
};

export const addRoom = async (values: z.infer<typeof RoomFormSchema>) => {
  try {
    // validate data in backend
    const validatedFields = RoomFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }
    // destructure data from validated fields
    const { beds, features, images, number, persons, price, room_type } =
      validatedFields.data;

    // check room number is available or not
    const room = await getRoomById(number);

    // if room number already exists
    if (room) {
      return {
        error: "Room number already exists",
      };
    }

    // add room to the database
    const newRoom = await createRoom(
      number,
      room_type,
      price,
      persons,
      beds,
      images,
      features,
    );

    // if failed to add room
    if (!newRoom) {
      return {
        error: "Failed to add room",
      };
    }

    // return success message
    return {
      success: "Room added successfully",
    };
  } catch (error) {
    return {
      error: "Failed to add room",
    };
  }
};
