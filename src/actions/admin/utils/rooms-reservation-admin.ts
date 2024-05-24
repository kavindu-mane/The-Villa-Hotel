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

// update reservation
export const updateReservation = async (
  id: string,
  roomId: string,
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
    const reservation = await db.reservation.update({
      where: {
        id,
      },
      data: {
        roomId,
        bed,
        name,
        email,
        phone,
        checkIn,
        checkOut,
        total,
        pendingBalance: total - total * (offer / 100),
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};

// return all reservations with pagination
export const getReservations = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.reservation.count()) / limit;
  // convert count to integer
  pages = Math.ceil(pages);
  // if page is greater than pages
  if (page > pages) {
    page = pages;
  }

  // if page is less than 1
  if (page < 1) {
    page = 1;
  }

  try {
    const reservations = await db.reservation.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        checkIn: "desc",
      },
      select: {
        room: true,
        bed: true,
        reservationNo: true,
        roomId: true,
        total: true,
        offer: true,
        pendingBalance: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        checkIn: true,
        checkOut: true,
        type: true,
      },
    });
    return reservations;
  } catch (e) {
    return null;
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
              gt:checkOut,
            },
            checkOut: {
              lte: checkOut,
            }
          },
          {
            checkIn: {
              gte: checkIn,
            },
            checkOut: {
              lt: checkIn,
            }
          },
          {
            checkIn: {
              lte: checkIn,
            },
            checkOut: {
              gte: checkOut,
            }
          }
        ],
      },
    });
    return reservation;
  } catch (e) {
    return null;
  }
};
