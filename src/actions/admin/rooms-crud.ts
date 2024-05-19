"use server";

import { z } from "zod";
import {
  createRoom,
  getRoomById,
  getRoomByNumber,
  getRooms,
  updateRoom,
} from "./utils/rooms-admin";
import { RoomFormSchema } from "@/validations";
import { db } from "@/lib/db";

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

export const addOrUpdateRoom = async (
  values: z.infer<typeof RoomFormSchema>,
  isUpdate: boolean,
  page: number = 1,
) => {
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
    const room = await getRoomByNumber(number);

    let newRoom = null;

    // if room number already exists
    if (room) {
      if (!isUpdate) {
        return {
          error: "Room number already exists",
        };
      } else {
        // update room to the database
        newRoom = await updateRoom(
          room.id,
          room_type,
          price,
          persons,
          beds,
          images,
          features,
        );
      }
    } else {
      // add room to the database
      newRoom = await createRoom(
        number,
        room_type,
        price,
        persons,
        beds,
        images,
        features,
      );
    }

    // if failed to add room
    if (!newRoom) {
      return {
        error: "Failed to add or update room",
      };
    }

    // get updated rooms data
    const rooms = await getRooms(page, 10);

    // return success message
    return {
      success: "Room added/update successfully",
      data: rooms,
    };
  } catch (error) {
    return {
      error: "Failed to add room",
    };
  }
};

export const deleteRoomsImages = async (
  roomId: string,
  images: string[],
  page: number,
) => {
  try {
    // get room by id
    const room = await getRoomById(roomId);

    // if failed to get room
    if (!room) {
      return {
        error: "Failed to delete images",
      };
    }

    // delete images from the room
    const updatedRoom = await db.rooms.update({
      where: {
        id: roomId,
      },
      data: {
        images: {
          data: images,
        },
      },
    });

    // get all updated rooms
    const rooms = await getRooms(page, 10);

    // if failed to update room images
    if (!updatedRoom) {
      return {
        error: "Failed to delete images",
      };
    }

    // return success message
    return {
      success: "Images deleted successfully",
      room: updatedRoom,
      rooms,
    };
  } catch (error) {
    return {
      error: "Failed to delete images",
    };
  }
};
