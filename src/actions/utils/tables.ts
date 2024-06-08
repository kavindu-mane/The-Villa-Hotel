"use server";

import { db } from "@/lib/db";

//get available tables
export const getAvailableTables = async (date: Date, timeSlot: string) => {
  try {
    const tables = await db.tables.findMany({
      where: {
        tabelReservation: {
          none: {
            date,
            timeSlot,
          },
        },
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
    });
    return table;
  } catch (e) {
    return null;
  }
};

//get all tables
export const getAllTables = async () => {
  try {
    const tables = await db.tables.findMany();
    return tables;
  } catch (e) {
    return null;
  }
};
