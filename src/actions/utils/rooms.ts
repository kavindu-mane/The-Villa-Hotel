"use server";

import { db } from "@/lib/db";
import { RoomType } from "@prisma/client";

// get available rooms
export const getAvailableRooms = async (
  roomType: RoomType,
  startDate: Date,
  endDate: Date,
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
                  gt: endDate,
                },
              },
              {
                checkOut: {
                  lt: startDate,
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
  startDate: Date,
  endDate: Date,
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
                  gt: endDate,
                },
              },
              {
                checkOut: {
                  lt: startDate,
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
