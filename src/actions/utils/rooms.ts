"use server";

import { db } from "@/lib/db";
import { RoomType } from "@prisma/client";
import { cookies } from "next/headers";
import { getReservationById } from "./room-reservations";

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
        roomReservation: {
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
        images360: true,
        _count: true,
      },
    });
    const roomFromCookie = await getRoomFromCookie();
    // // add room from cookie to available rooms
    if (roomFromCookie) {
      rooms.push(roomFromCookie);
    }
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
        roomReservation: {
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
        images360: true,
        _count: true,
      },
    });
    return rooms;
  } catch (e) {
    return null;
  }
};

// get room by cookie
export const getRoomFromCookie = async () => {
  try {
    // get cookies
    const cookieStore = cookies();
    // check pending_reservation cookie if exists
    const reservation = cookieStore.get("pending_reservation");

    if (reservation) {
      // check if reservation exists
      const existingReservation = await getReservationById(reservation.value);

      if (!existingReservation) return null;

      const room = await db.rooms.findUnique({
        where: {
          id: existingReservation.roomId,
        },
        select: {
          number: true,
          price: true,
          type: true,
          features: true,
          persons: true,
          images: true,
          images360: true,
          _count: true,
        },
      });
      return room;
    }
    return null;
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
