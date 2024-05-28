"use server";

import { z } from "zod";
import { getPromotionByCode, getPromotions } from "../utils/promotions";
import { PromotionsFormSchema } from "@/validations";
import { createPromotion, updatePromotion } from "./utils/promotions-admin";
import { DEFAULT_PAGINATION_SIZE } from "@/constants";

/**
 * Server action for reservations crud operations
 * @role admin
 */

export const getPromotionsData = async (page: number) => {
  try {
    const promotions = await getPromotions(page, DEFAULT_PAGINATION_SIZE);

    // if failed to get promotions data
    if (!promotions) {
      return {
        promotions: null,
        totalPages: 0,
        currentPage: 0,
      };
    }

    // return promotions data
    return {
      promotions: promotions.offers,
      totalPages: promotions.pages,
      currentPage: promotions.page,
    };
  } catch (error) {
    return {
      error: "Failed to get promotions data",
    };
  }
};

export const addOrUpdatePromotion = async (
  values: z.infer<typeof PromotionsFormSchema>,
  isUpdate: boolean,
  page: number = 1,
) => {
  try {
    // validate data in backend
    const validatedFields = PromotionsFormSchema.safeParse(values);
    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data from validated fields
    const { code, description, discount, validFrom, validTo } =
      validatedFields.data;

    // check promotion code is available or not
    const promotion = await getPromotionByCode(code);

    let newPromotion = null;

    // if promotion already exist
    if (promotion) {
      if (!isUpdate) {
        return {
          error: "Promotion code already exists",
        };
      } else {
        // update promotion to the database
        newPromotion = await updatePromotion(
          promotion.id,
          code,
          description,
          discount,
          validFrom,
          validTo,
        );
      }
    } else {
      // add promotion to the database
      newPromotion = await createPromotion(
        code,
        description,
        discount,
        validFrom,
        validTo,
      );
    }

    // if failed to add or update promotion
    if (!newPromotion) {
      return {
        error: "Failed to add or update promotion",
      };
    }

    // get updated promotions
    const promotions = await getPromotions(page, DEFAULT_PAGINATION_SIZE);

    // return success message
    return {
      success: "Promotion added/updated successfully",
      data: promotions,
    };
  } catch (error) {
    return {
      error: "Failed to add promotion",
    };
  }
};
