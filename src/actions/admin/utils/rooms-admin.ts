"use server";

import { db } from "@/lib/db";
import { RoomType } from "@prisma/client";

// create room
export const createRoom = async (
  number: number,
  type: RoomType,
  price: number,
  persons: number,
  beds: string[],
  images: string[],
  features: string[],
  images360: string | null,
) => {
  try {
    const room = await db.rooms.create({
      data: {
        number,
        type,
        price,
        persons,
        images360,
        images: {
          data: images,
        },
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
  type: RoomType,
  price: number,
  persons: number,
  beds: string[],
  images: string[],
  features: string[],
  images360: string | null,
) => {
  try {
    const room = await db.rooms.update({
      where: {
        id,
      },
      data: {
        type,
        price,
        persons,
        images360,
        beds: {
          data: beds,
        },
        features: {
          data: features,
        },
        images: {
          data: images,
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

  // if page less than 1, set page to 1
  if (page < 1) {
    page = 1;
  }

  try {
    const rooms = await db.rooms.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { rooms, pages, page };
  } catch (e) {
    return null;
  }
};

// get room by id
export const getRoomById = async (id: string) => {
  try {
    const room = await db.rooms.findUnique({
      where: {
        id,
      },
    });
    return room;
  } catch (e) {
    return null;
  }
};
