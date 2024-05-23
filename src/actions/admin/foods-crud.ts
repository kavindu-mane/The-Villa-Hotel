"use server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  createFood,
  getFoodById,
  getFoodByNumber,
  getFoods,
  updateFood,
} from "./utils/foods-admin";
import { FoodFormSchema } from "@/validations";

/**
 * Server action for food crud operations
 * @role admin
 */

export const getFoodsData = async (page: number) => {
  try {
    const foods = await getFoods(page, 10);

    // if failed to get foods data
    if (!foods) {
      return {
        foods: null,
      };
    }

    // return foods data
    return {
      foods,
    };
  } catch (error) {
    return {
      error: "Failed to get foods data",
    };
  }
};

export const addOrUpdateFood = async (
  values: z.infer<typeof FoodFormSchema>,
  isUpdate: boolean,
  page: number = 1,
) => {
  try {
    // validate data in backend
    const validatedFields = FoodFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }
    // destructure data from validated fields
    const { foodId, foodType, name, price, description, images } =
      validatedFields.data;

    // check food number is available or not
    const food = await getFoodByNumber(foodId);

    let newFood = null;

    // if food number already exists
    if (food) {
      if (!isUpdate) {
        return {
          error: "Food ID already exists",
        };
      } else {
        // update food to the database
        newFood = await updateFood(
          food.id,
          foodId,
          foodType,
          name,
          price,
          description,
          images,
        );
      }
    } else {
      // add food to the database
      newFood = await createFood(
        foodId,
        foodType,
        name,
        price,
        description,
        images,
      );
    }

    // if failed to add room
    if (!newFood) {
      return {
        error: "Failed to add or update Food",
      };
    }

    // get updated foods data
    const foods = await getFoods(page, 10);

    // return success message
    return {
      success: "Food added/update successfully",
      data: foods,
    };
  } catch (error) {
    return {
      error: "Failed to add/update food",
    };
  }
};

export const deleteFoodsImages = async (
  foodId: string,
  images: string[],
  page: number,
) => {
  try {
    // get food by id
    const food = await getFoodById(foodId);

    // if failed to get food
    if (!food) {
      return {
        error: "Failed to delete images",
      };
    }

    // delete images from the food
    const updatedFood = await db.foods.update({
      where: {
        id: foodId,
      },
      data: {
        images: {
          data: images,
        },
      },
    });

    // get all updated foods
    const foods = await getFoods(page, 10);

    // if failed to update food images
    if (!updatedFood) {
      return {
        error: "Failed to delete images",
      };
    }

    // return success message
    return {
      success: "Images deleted successfully",
      food: updatedFood,
      foods,
    };
  } catch (error) {
    return {
      error: "Failed to delete images",
    };
  }
};
