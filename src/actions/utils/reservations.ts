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
export const confirmReservations = async (id: string, payment: number) => {
  try {
    const reservation = await db.reservation.update({
      where: {
        id,
      },
      data: {
        status: "Confirmed",
        pendingBalance: {
          decrement: payment,
        },
      },
      include: {
        offer: true,
        room: true,
      },
    });
    return reservation;
  } catch (e) {
    return null;
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
export const deleteReservation = async (id: string, status: Status) => {
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
        if (reservation.status === status) {
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

// update status of reservation by id
export const updateReservationStatus = async (id: string, status: Status) => {
  try {
    const reservation = await db.reservation.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};
