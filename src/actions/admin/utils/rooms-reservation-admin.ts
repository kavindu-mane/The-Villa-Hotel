"use server";

import { db } from "@/lib/db";
import { BedTypes } from "@prisma/client";

// update reservation
export const updateReservation = async (
  data: {
    id: string;
    roomId: string;
    bed: BedTypes;
    name: string;
    email: string;
    phone: string;
    checkIn: Date;
    checkOut: Date;
    total: number;
    userId?: string | null;
    offerId?: string | null;
  },
  offer: number,
) => {
  const { id, total } = data;
  try {
    const reservation = await db.reservation.update({
      where: {
        id,
      },
      data: {
        ...data,
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
      where: {
        NOT: {
          status: "Pending",
        },
      },
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
        offerDiscount: true,
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
