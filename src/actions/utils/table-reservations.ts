"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";

//get reservation by tabe reservation number
export const getTableReservationByNumber = async (reservationNo: number) => {
  try {
    const tableReservation = await db.tableReservation.findFirst({
      where: {
        reservationNo,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

//get reservation by table reservation id
export const getTableReservationById = async (id: string) => {
  try {
    const tableReservation = await db.tableReservation.findUnique({
      where: {
        id,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

//check table availability by table number and date and timeslot
export const checkTableAvailability = async (
  tableId: string,
  date: Date,
  timeSlot: string,
) => {
  try {
    const tableReservation = await db.tableReservation.findFirst({
      where: {
        tableId,
        date,
        timeSlot,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

//delete table reservation by id(only if status is pending)
export const deleteTableReservation = async (id: string, status: Status) => {
  try {
    //get current table reservation state and delete if its pending
    const transaction = await db.$transaction(async (tx) => {
      const tableReservation = await db.tableReservation.delete({
        where: {
          id,
        },
        select: {
          status: true,
        },
      });

      if (tableReservation) {
        if (tableReservation.status === status) {
          await db.tableReservation.delete({
            where: {
              id,
            },
          });
        }
      } else {
        return null;
      }
    });
    return transaction;
  } catch (e) {
    return null;
  }
};

//update status of table reservation by id
export const updateTableReservationStatus = async (
  id: string,
  status: Status,
) => {
  try {
    const tableReservation = await db.tableReservation.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};
