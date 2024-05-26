"use server";

import { db } from "@/lib/db";
import { BedTypes } from "@prisma/client";

// create reservation from admin
export const createReservation = async (
  roomId: string,
  userId: string | null,
  bed: BedTypes,
  offer: number,
  name: string,
  email: string,
  phone: string,
  checkIn: Date,
  checkOut: Date,
  total: number,
) => {
  try {
    let pendingBalance = total - total * (offer / 100);
    pendingBalance = Math.round(pendingBalance * 100) / 100;

    const reservation = await db.reservation.create({
      data: {
        roomId,
        userId,
        bed,
        name,
        email,
        phone,
        checkIn,
        checkOut,
        total,
        offer,
        pendingBalance,
        type: "Offline",
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};

// confirm reservation function
export const confirmReservations = async (bookingId: string) => {
  try {
    // Find the booking
    const booking = await db.reservation.findUnique({
      where: { id: bookingId },
      include: { room: true },
    });

    // Check if the room is still available
    if (!booking) {
      return { success: false };
    }
    const available = await db.rooms.findFirst({
      where: {
        id: booking.room.id,
        reservation: {
          none: {
            OR: [
              { checkIn: { gt: booking.checkOut } },
              { checkOut: { lt: booking.checkIn } },
            ],
          },
        },
      },
    });

    // If the room is available, return success
    if (available) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (e) {
    return { success: false };
  }
};

// get reservation by id
export const getReservationByNumber = async (number: number) => {
  try {
    const reservation = await db.reservation.findUnique({
      where: {
        reservationNo: number,
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};

// check room availability by room number and check-in and check-out date
export const checkRoomAvailability = async (
  roomId: string,
  checkIn: Date,
  checkOut: Date,
) => {
  try {
    const reservation = await db.reservation.findFirst({
      where: {
        roomId,
        OR: [
          {
            checkIn: {
              gt: checkOut,
            },
            checkOut: {
              lte: checkOut,
            },
          },
          {
            checkIn: {
              gte: checkIn,
            },
            checkOut: {
              lt: checkIn,
            },
          },
          {
            checkIn: {
              lte: checkIn,
            },
            checkOut: {
              gte: checkOut,
            },
          },
        ],
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};
