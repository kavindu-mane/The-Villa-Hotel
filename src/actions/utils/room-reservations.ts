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
  roomReservationType?: "Full_Board" | "Half_Board" | undefined;
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
    const reservation = await db.roomReservation.create({
      data: {
        ...data,
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
    const reservation = await db.roomReservation.update({
      where: {
        id,
      },
      data: {
        status: "Confirmed",
        paidAmount: {
          increment: payment,
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
    const reservation = await db.roomReservation.findUnique({
      where: {
        reservationNo: number,
      },
      include: {
        room: true,
        offer: true,
        foodReservation: {
          include: {
            foodReservationItems: {
              select: {
                foodId: true,
                quantity: true,
                total: true,
                coins: true,
                food: {
                  select: {
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
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
    const reservation = await db.roomReservation.findUnique({
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
    const reservation = await db.roomReservation.findMany({
      where: {
        roomId,
        OR: [
          {
            checkOut: {
              gt: checkIn,
              lte: checkOut,
            },
          },
          {
            checkIn: {
              gte: checkIn,
              lt: checkOut,
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
      const reservation = await db.roomReservation.findUnique({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      if (reservation) {
        if (reservation.status === status) {
          await db.roomReservation.delete({
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
    const reservation = await db.roomReservation.update({
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
