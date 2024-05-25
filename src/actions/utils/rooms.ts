"use server";

import { db } from "@/lib/db";
import { RoomType } from "@prisma/client";

// get available rooms
export const getAvailableRooms = async (
  roomType: RoomType,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const rooms = await db.rooms.findMany({
      where: {
        type: roomType,
        reservation: {
          none: {
            OR: [
              {
                checkIn: {
                  lt: checkOut,
                },
                checkOut: {
                  gt: checkIn,
                },
              },
            ],
          },
        },
      },
      select: {
        number: true,
        price: true,
        type: true,
        features: true,
        persons: true,
        images: true,
        _count: true,
      },
    });
    return rooms;
  } catch (e) {
    return null;
  }
};

// get other available rooms
export const getOtherAvailableRooms = async (
  room_type: "Deluxe" | "Superior" | "Standard",
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const rooms = await db.rooms.findMany({
      where: {
        type: {
          not: room_type,
        },
        reservation: {
          none: {
            OR: [
              {
                checkIn: {
                  lt: checkOut,
                },
                checkOut: {
                  gt: checkIn,
                },
              },
            ],
          },
        },
      },
      select: {
        number: true,
        price: true,
        type: true,
        persons: true,
        features: true,
        images: true,
        _count: true,
      },
    });
    return rooms;
  } catch (e) {
    return null;
  }
};

// get room by number
export const getRoomByNumber = async (number: number) => {
  try {
    const room = await db.rooms.findUnique({
      where: {
        number,
      },
    });
    return room;
  } catch (e) {
    return null;
  }
};

//get all rooms
export const getAllRooms = async () => {
  try {
    const rooms = await db.rooms.findMany();
    return rooms;
  } catch (e) {
    return null;
  }
};
