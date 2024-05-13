import { db } from "@/lib/db";
import { RoomType } from "@prisma/client";

// create room
export const createRoom = async (
  number: number,
  type: RoomType,
  price: number,
  persons: number,
  beds: string[],
  features: string[],
) => {
  try {
    const room = await db.rooms.create({
      data: {
        number,
        type,
        price,
        persons,
        beds: {
          data: beds,
        },
        features: {
          data: features,
        },
      },
    });
    return room;
  } catch (e) {
    return null;
  }
};

// update room
export const updateRoom = async (
  id: string,
  number: number,
  type: RoomType,
  price: number,
  persons: number,
  beds: string[],
  features: string[],
) => {
  try {
    const room = await db.rooms.update({
      where: {
        id,
      },
      data: {
        number,
        type,
        price,
        persons,
        beds: {
          set: beds,
        },
        features: {
          set: features,
        },
      },
    });
    return room;
  } catch (e) {
    return null;
  }
};

// return rooms with pagination
export const getRooms = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.rooms.count()) / limit;
  // convert to near upper integer
  pages = Math.ceil(pages);
  // if page is greater than pages, set page to pages
  if (page > pages) {
    page = pages;
  }

  try {
    const rooms = await db.rooms.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return rooms;
  } catch (e) {
    return null;
  }
};
