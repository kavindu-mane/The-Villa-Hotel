"use server";

import { db } from "@/lib/db";
import { BookingType, Status } from "@prisma/client";

// update reservation
export const updateTableReservation = async (data: {
  id: string;
  tableId: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
  total: number;
  userId?: string | null;
},
offer: number,
) => {
  const { id } = data;
  try {
    const tableReservation = await db.tableReservation.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

// return all table reservations with pagination
export const getTableReservations = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.tableReservation.count()) / limit;
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
    const tableReservations = await db.tableReservation.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        date: "asc",
      },
      select: {
        table:true,
        tableId: true,
        reservationNo: true,
        name: true,
        email: true,
        phone: true,
        date: true,
        timeSlot: true,
        total: true,
        offer: true,
        offerDiscount: true,
        status: true,
        foodReservations: true,
      },
    });
    return tableReservations;
  } catch (e) {
    return null;
  }
};

//create table reservation from admin
export const createTableReservation = async (data: {
  tableId: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
  total: number;
  coins: number;
  offerDiscount: number;
  status: Status;
  type: BookingType;
  offerId: string | null;
  userId?: string | null;
  foodReservationsId: string | null;
}) => {
  try {
    const tableReservation = await db.tableReservation.create({
      data: {
        ...data,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};
