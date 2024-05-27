"use server";

import { db } from "@/lib/db";
import { BedTypes, BookingType, Status } from "@prisma/client";

// create reservation from admin
export const createReservation = async (data: {
  roomId: string;
  offerDiscount: number;
  checkIn: Date;
  checkOut: Date;
  total: number;
  userId?: string | null;
  bed?: BedTypes | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: Status;
  type?: BookingType;
  offerId?: string | null;
}) => {
  try {
    const { total, offerDiscount } = data;
    let pendingBalance = total - total * (offerDiscount / 100);
    pendingBalance = Math.round(pendingBalance * 100) / 100;

    const reservation = await db.reservation.create({
      data: {
        ...data,
        pendingBalance,
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

// get reservation by reservation number
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

// get reservation by id
export const getReservationById = async (id: string) => {
  try {
    const reservation = await db.reservation.findUnique({
      where: {
        id,
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

// delete reservation by id (only if status equals to pending)
export const deleteReservation = async (id: string) => {
  try {
    // get current reservation state and delete if its pending
    const transaction = await db.$transaction(async (tx) => {
      const reservation = await db.reservation.findUnique({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      if (reservation) {
        if (reservation.status === "Pending") {
          await db.reservation.delete({
            where: {
              id,
            },
          });
        }
      } else {
        return null;
      }
    });

    return transaction;
  } catch (e) {
    return null;
  }
};
