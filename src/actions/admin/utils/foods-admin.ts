"use server"

import { db } from "@/lib/db";
import { FoodType } from "@prisma/client";

// create food
export const createFood = async (
  foodId: string,
  type: FoodType,
  name: string,
  price: number,
  description: string,
  images: string[],
) => {
  try {
    const food = await db.foods.create({
      data: {
        foodId,
        foodType: type,
        name,
        price,
        description,
        images: {
          data: images,
        },
      },
    });
    return food;
  } catch (e) {
    return null;
  }
};

// update food
export const updateFood = async (
  id: string,
  foodId: string,
  type: FoodType,
  name: string,
  price: number,
  description: string,
  images: string[],
) => {
  try {
    const food = await db.foods.update({
      where: {
        id,
      },
      data: {
        foodId: foodId,
        foodType: type,
        name,
        price,
        description,
        images: {
          data: images,
        },
      },
    });
    return food;
  } catch (e) {
    return null;
  }
};

// return foods with pagination
export const getFoods = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.foods.count()) / limit;
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
    const foods = await db.foods.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {foods , pages, page};
  } catch (e) {
    return null;
  }
};

// get food by id
export const getFoodById = async (id: string) => {
  try {
    const food = await db.foods.findUnique({
      where: {
        id,
      },
    });
    return food;
  } catch (e) {
    return null;
  }
};

// get food by food number
export const getFoodByNumber = async (foodId: string) => {
  try {
    const food = await db.foods.findUnique({
      where: {
        foodId,
      },
    });
    return food;
  } catch (e) {
    return null;
  }
};
