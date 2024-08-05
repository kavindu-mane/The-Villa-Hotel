"use server";

import { db } from "@/lib/db";
import { minimalFoodData } from "@/types";
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

    const categorizedMenuItems = menuItems.reduce(
      (acc: { type: string; items: minimalFoodData[] }[], item) => {
        const existingType = acc.find((type) => type.type === item.foodType);
        if (existingType) {
          // If the type exists, push the current item to its items array
          existingType.items.push(item as minimalFoodData);
        } else {
          // If the type does not exist, create a new category with the item
          acc.push({ type: item.foodType, items: [item as minimalFoodData] });
        }
        return acc;
      },
      [],
    );

    // return success response with menu items
    return categorizedMenuItems;
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
    offerId: string | null;
    coins: number;
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
        coins: food.coins,
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
