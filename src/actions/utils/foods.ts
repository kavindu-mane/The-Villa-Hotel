"use server";

import { db } from "@/lib/db";
import { Status } from "@prisma/client";

// get available menu items
export const getAvailableMenuItems = async () => {
  try {
    // fetch all menu items from the database
    const menuItems = await db.foods.findMany({
      select: {
        name: true,
        description: true,
        price: true,
        images: true,
        foodId: true,
        foodType: true,
      },
    });

    // return success response with menu items
    return menuItems;
  } catch (error) {
    return null;
  }
};

// create food reservation
export const createFoodReservation = async (
  data: {
    specialRequirement?: string;
    tableReservationId?: string;
    roomReservationId?: string;
    status?: Status;
  },
  foods: { foodId: string; quantity: number; total: number }[],
) => {
  try {
    const foodReservation = await db.foodReservation.create({
      data: {
        ...data,
        foodReservationItems: {
          createMany: {
            data: foods,
          },
        },
      },
    });

    return foodReservation;
  } catch (e) {
    return null;
  }
};

// get food details by food ID
export const getFoodDetailsById = async (foodId: string) => {
  try {
    const food = await db.foods.findUnique({
      where: {
        foodId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
        foodId: true,
      },
    });
    return food;
  } catch (e) {
    return null;
  }
};

// update food reservation status by ID
export const updateFoodReservationTotals = async (
  id: string,
  foods: {
    foodId: string;
    quantity: number;
    foodReservationId: string;
    total: number;
    offerDiscount: number;
    offerId: string;
  }[],
) => {
  try {
    const mappedFoods = foods.map((food) => ({
      where: {
        foodReservationId: food.foodReservationId,
        foodId: food.foodId,
      },
      data: {
        quantity: food.quantity,
        total: food.total,
        offerDiscount: food.offerDiscount,
        offerId: food.offerId,
      },
    }));
    const foodReservation = await db.foodReservation.update({
      where: {
        id,
      },
      data: {
        foodReservationItems: {
          updateMany: mappedFoods,
        },
      },
    });
    return foodReservation;
  } catch (e) {
    return null;
  }
};

// update food reservation status by ID
export const updateFoodReservationStatus = async (
  id: string,
  status: Status,
) => {
  try {
    const foodReservation = await db.foodReservation.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
    return foodReservation;
  } catch (e) {
    return null;
  }
};
