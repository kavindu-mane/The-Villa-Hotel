"use server";

import { DEFAULT_PAGINATION_SIZE } from "@/constants";
import { db } from "@/lib/db";
import getSession from "@/lib/getSession";

export const getRoomAndTableReservations = async (
  page: number,
  limit?: number,
) => {
  try {
    // session
    const session = await getSession();
    // if session is not available
    if (!session) {
      return {
        error: "You need to be logged in to view this page",
      };
    }

    // get all room reservations
    const roomReservations = await db.roomReservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        room: true,
        offer: true,
        foodReservation: true,
        feedbacks: true,
      },
      take: limit || DEFAULT_PAGINATION_SIZE,
      skip: (page - 1) * DEFAULT_PAGINATION_SIZE,
    });

    // get table reservations
    const tableReservations = await db.tableReservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        table: true,
        foodReservation: true,
        offer: true,
      },
      take: limit || DEFAULT_PAGINATION_SIZE,
      skip: (page - 1) * DEFAULT_PAGINATION_SIZE,
    });

    // return reservations
    return {
      roomReservations,
      tableReservations,
    };
  } catch (error) {
    return {
      error: "Failed to get reservations",
    };
  }
};

export const getRoomReservations = async (page: number, limit?: number) => {
  try {
    // session
    const session = await getSession();
    // if session is not available
    if (!session) {
      return {
        error: "You need to be logged in to view this page",
      };
    }

    // get pages count in the database
    let pages = (await db.roomReservation.count()) / DEFAULT_PAGINATION_SIZE;
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

    // get all room reservations
    const roomReservations = await db.roomReservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        room: true,
        offer: true,
        foodReservation: true,
        feedbacks: true,
      },
      take: limit || DEFAULT_PAGINATION_SIZE,
      skip: (page - 1) * DEFAULT_PAGINATION_SIZE,
    });

    // return reservations
    return {
      roomReservations,
      totalPages: pages,
      currentPage: page,
    };
  } catch (error) {
    return {
      error: "Failed to get reservations",
    };
  }
};

export const getTableReservations = async (page: number, limit?: number) => {
  try {
    // session
    const session = await getSession();
    // if session is not available
    if (!session) {
      return {
        error: "You need to be logged in to view this page",
      };
    }

    // get pages count in the database
    let pages = (await db.tableReservation.count()) / DEFAULT_PAGINATION_SIZE;
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

    // get all table reservations
    const tableReservations = await db.tableReservation.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        table: true,
        offer: true,
        foodReservation: true,
        feedbacks: true,
      },
      take: limit || DEFAULT_PAGINATION_SIZE,
      skip: (page - 1) * DEFAULT_PAGINATION_SIZE,
    });

    // return reservations
    return {
      tableReservations,
      totalPages: pages,
      currentPage: page,
    };
  } catch (error) {
    return {
      error: "Failed to get reservations",
    };
  }
};

export const getTransactions = async (page: number, limit?: number) => {
  try {
    // session
    const session = await getSession();
    // if session is not available
    if (!session) {
      return {
        error: "You need to be logged in to view this page",
      };
    }

    // get pages count in the database
    let pages = (await db.roomReservation.count()) / DEFAULT_PAGINATION_SIZE;
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

    // get all transactions
    const transactions = await db.payments.findMany({
      where: {
        roomreservation: {
          userId: session.user.id,
        },
      },
      include: {
        roomreservation: {
          include: {
            room: true,
          },
        },
      },
      take: limit || DEFAULT_PAGINATION_SIZE,
      skip: (page - 1) * DEFAULT_PAGINATION_SIZE,
    });

    // return transactions
    return {
      transactions,
      totalPages: pages,
      currentPage: page,
    };
  } catch (error) {
    return {
      error: "Failed to get transactions",
    };
  }
};
