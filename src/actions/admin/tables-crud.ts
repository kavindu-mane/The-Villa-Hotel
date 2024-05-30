"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  createTable,
  getTableById,
  getTableByNumber,
  getTables,
  updateTable,
} from "./utils/tables-admin";
import { TableFormSchema } from "@/validations";
import { DEFAULT_PAGINATION_SIZE } from "@/constants";

/**
 * Server action for table crud operations
 * @role admin
 */

export const getTablesData = async (page: number) => {
  try {
    const tables = await getTables(page, DEFAULT_PAGINATION_SIZE);

    // if failed to get tables data
    if (!tables) {
      return {
        tables: null,
      };
    }

    // return tables data
    return {
      tables,
    };
  } catch (error) {
    return {
      error: "Failed to get tables data",
    };
  }
};

export const addOrUpdateTable = async (
  values: z.infer<typeof TableFormSchema>,
  isUpdate: boolean,
  page: number = 1,
) => {
  try {
    // validate data in backend
    const validatedFields = TableFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }
    // destructure data from validated fields
    const { tableId, tableType, price, description, images } =
      validatedFields.data;

    // check table number is available or not
    const table = await getTableByNumber(tableId);

    let newTable = null;

    // if table number already exists
    if (table) {
      if (!isUpdate) {
        return {
          error: "table ID already exists",
        };
      } else {
        // update table to the database
        newTable = await updateTable(
          table.id,
          tableId,
          tableType,
         
          price,
          description,
          images,
        );
      }
    } else {
      // add table to the database
      newTable = await createTable(
        tableId,
        tableType,
        
        price,
        description,
        images,
      );
    }

    // if failed to add table
    if (!newTable) {
      return {
        error: "Failed to add or update Table",
      };
    }

    // get updated tables data
    const tables = await getTables(page, DEFAULT_PAGINATION_SIZE);

    // return success message
    return {
      success: "Table added/update successfully",
      data: tables,
    };
  } catch (error) {
    return {
      error: "Failed to add/update table",
    };
  }
};

export const deleteTablesImages = async (
  tableId: string,
  images: string[],
  page: number,
) => {
  try {
    // get table by id
    const table = await getTableById(tableId);

    // if failed to get table
    if (!table) {
      return {
        error: "Failed to delete images",
      };
    }

    // delete images from the table
    const updatedTable = await db.tables.update({
      where: {
        id: tableId,
      },
      data: {
        images: {
          data: images,
        },
      },
    });

    // get all updated tables
    const tables = await getTables(page, DEFAULT_PAGINATION_SIZE);

    // if failed to update table images
    if (!updatedTable) {
      return {
        error: "Failed to delete images",
      };
    }

    // return success message
    return {
      success: "Images deleted successfully",
      table: updatedTable,
      tables,
    };
  } catch (error) {
    return {
      error: "Failed to delete images",
    };
  }
};
