"use server";

import { db } from "@/lib/db";
import { TableType } from "@prisma/client";

// create table
export const createTable = async (
  tableId: string,
  type: TableType,

  price: number,
  description: string,
  images: string[],
) => {
  try {
    const table = await db.tables.create({
      data: {
        tableId,
        tableType: type,

        price,
        description,
        images: {
          data: images,
        },
      },
    });
    return table;
  } catch (e) {
    return null;
  }
};

// update tables
export const updateTable = async (
  id: string,
  tableId: string,
  type: TableType,

  price: number,
  description: string,
  images: string[],
) => {
  try {
    const table = await db.tables.update({
      where: {
        id,
      },
      data: {
        tableId: tableId,
        tableType: type,

        price,
        description,
        images: {
          data: images,
        },
      },
    });
    return table;
  } catch (e) {
    return null;
  }
};

// return tables with pagination
export const getTables = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.tables.count()) / limit;
  // convert to near upper integer
  pages = Math.ceil(pages);
  // if page is greater than pages, set page to pages
  if (page > pages) {
    page = pages;
  }
  // if page less than 1, set page to 1
  if (page < 1) {
    page = 1;
  }

  try {
    const tables = await db.tables.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {tables , pages, page};
  } catch (e) {
    return null;
  }
};

// get table by id
export const getTableById = async (id: string) => {
  try {
    const table = await db.tables.findUnique({
      where: {
        id,
      },
    });
    return table;
  } catch (e) {
    return null;
  }
};

// get table by table ID
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
