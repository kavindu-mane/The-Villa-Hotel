"use server";

import { db } from "@/lib/db";
import { BedTypes, RoomReservationType } from "@prisma/client";

// update reservation
export const updateReservation = async (data: {
  id: string;
  roomId: string;
  bed: BedTypes;
  name: string;
  email: string;
  phone: string;
  checkIn: Date;
  checkOut: Date;
  total: number;
  coins?: number;
  userId?: string | null;
  offerId?: string | null;
  roomReservationType?: RoomReservationType;
}) => {
  const { id } = data;
  try {
    const reservation = await db.roomReservation.update({
      where: {
        id,
      },
      data: {
        ...data,
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
  let pages = (await db.roomReservation.count()) / limit;
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
    const reservations = await db.roomReservation.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: {
        status: "Confirmed",
      },
      orderBy: {
        checkIn: "asc",
      },
      select: {
        room: true,
        bed: true,
        reservationNo: true,
        roomId: true,
        total: true,
        offer: true,
        offerDiscount: true,
        paidAmount: true,
        name: true,
        email: true,
        phone: true,
        status: true,
        checkIn: true,
        checkOut: true,
        type: true,
        roomReservationType: true,
      },
    });
    return { reservations, pages, page };
  } catch (e) {
    return null;
  }
};
