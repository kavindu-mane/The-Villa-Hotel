"use server";

import { db } from "@/lib/db";
import { BookingType, Status } from "@prisma/client";

//create table reservation from admin
export const createTableReservation = async (data: {
  tableId: string;
  date: Date;
  timeSlot: string;
  total: number;
  offerDiscount: number;
  name?: string;
  email?: string;
  phone?: string;
  status?: Status;
  type?: BookingType;
  offerId?: string | null;
  userId?: string | null;
  coins?: number;
  foodReservationsId?: string | null;
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

//get reservation by table reservation number
export const getTableReservationByNumber = async (reservationNo: number) => {
  try {
    const tableReservation = await db.tableReservation.findFirst({
      where: {
        reservationNo,
      },
      include: {
        table: {
          select: {
            tableId: true,
            tableType: true,
          },
        },
        foodReservation: {
          include: {
            foodReservationItems: {
              select: {
                foodId: true,
                quantity: true,
                total: true,
                food: {
                  select: {
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
        offer: true,
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
      include: {
        table: {
          select: {
            tableId: true,
            tableType: true,
          },
        },
        foodReservation: {
          include: {
            foodReservationItems: {
              select: {
                foodId: true,
                quantity: true,
                total: true,
                food: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

//check table availability by table number and date and time slot
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
      const tableReservation = await db.tableReservation.findUnique({
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

// get entire reservation details with food reservations
export const getTableReservationDetails = async (id: string) => {
  try {
    const tableReservation = await db.tableReservation.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        email: true,
        coins: true,
        phone: true,
        date: true,
        timeSlot: true,
        total: true,
        table: {
          select: {
            tableId: true,
            tableType: true,
          },
        },
        foodReservation: {
          select: {
            specialRequirement: true,
            foodReservationItems: {
              select: {
                quantity: true,
                total: true,
                food: {
                  select: {
                    foodId: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return tableReservation;
  } catch (e) {
    return null;
  }
};

// update table reservations
export const updateTableReservation = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    date?: Date;
    timeSlot?: string;
    total?: number;
    status?: Status;
    offerDiscount?: number;
    offerId?: string;
    foodReservation?: any;
  },
) => {
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
