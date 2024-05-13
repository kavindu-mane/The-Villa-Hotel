"use server";

import { getRooms } from "./utils/rooms-admin";

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
