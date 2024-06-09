"use server";

import { db } from "@/lib/db";

//get available tables
export const getAvailableTables = async (date: Date, timeSlot: string) => {
  try {
    const tables = await db.tables.findMany({
      where: {
        tableReservation: {
          none: {
            date,
            timeSlot,
          },
        },
      },
      select: {
        tableId: true,
        price: true,
        images: true,
        tableType: true,
        description: true,
      },
    });
    return tables;
  } catch (e) {
    return null;
  }
};

//get table by number
export const getTableByNumber = async (tableId: string) => {
  try {
    const table = await db.tables.findUnique({
      where: {
        tableId,
      },
      select: {
        tableId: true,
        price: true,
        images: true,
        tableType: true,
        description: true,
      },
    });
    return table;
  } catch (e) {
    return null;
  }
};

//get all tables
export const getAllTables = async () => {
  try {
    const tables = await db.tables.findMany({
      select: {
        tableId: true,
        price: true,
        images: true,
        tableType: true,
        description: true,
      },
    });
    return tables;
  } catch (e) {
    return null;
  }
};
