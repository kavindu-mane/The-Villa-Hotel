"use server";

import { db } from "@/lib/db";

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
        foodReservation: true,
      },
    });
    return {tableReservations , pages, page};
  } catch (e) {
    return null;
  }
};

