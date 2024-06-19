"use server";

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { getTableReservationById } from "./table-reservations";

//get available tables
export const getAvailableTables = async (date: Date, timeSlot: string) => {
  try {
    const availableTables = await db.tables.findMany({
      where: {
        tableReservation: {
          some: {
            date,
            timeSlot,
          },
        },
      },
      select: {
        tableId: true,
        description: true,
        images: true,
        tableType: true,
        price: true,
      },
    });

    const allTables = await db.tables.findMany({
      select: {
        tableId: true,
        description: true,
        images: true,
        tableType: true,
        price: true,
      },
      orderBy: {
        tableId: "asc",
      },
    });

    // add availability status to tables based on available table and all tables
    const tables = allTables.map((table) => ({
      ...table,
      isAvailable: !availableTables.some(
        (availableTable) => availableTable.tableId === table.tableId,
      ),
    }));

    const tableFromCookie = await getTableFromCookie();
    // // add table from cookie to available tables
    if (tableFromCookie) {
      // change isAvailable to true
      const tableIndex = tables.findIndex(
        (table) => table.tableId === tableFromCookie.tableId,
      );
      tables[tableIndex] = {
        ...tables[tableIndex],
        isAvailable: true,
      };
    }

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
        id: true,
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
      orderBy: {
        tableId: "asc",
      },
    });
    return tables;
  } catch (e) {
    return null;
  }
};

//get table by cookie
export const getTableFromCookie = async () => {
  try {
    // get cookies
    const cookieStore = cookies();
    // check pending_reservation cookie if exists
    const reservation = cookieStore.get("pending_table_reservation");

    if (reservation) {
      // check if reservation exists
      const existingReservation = await getTableReservationById(
        reservation.value,
      );

      if (!existingReservation) return null;

      const table = await db.tables.findUnique({
        where: {
          id: existingReservation.tableId,
        },
        select: {
          tableId: true,
          description: true,
          images: true,
          tableType: true,
          price: true,
        },
      });
      return table;
    }
    return null;
  } catch (e) {
    return null;
  }
};
