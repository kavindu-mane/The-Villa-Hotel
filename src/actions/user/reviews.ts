"use server";

import { db } from "@/lib/db";
import getSession from "@/lib/getSession";
import { AddReviewSchema } from "@/validations/common";
import { z } from "zod";

export const addReview = async (
  data: z.infer<typeof AddReviewSchema>,
  id: string,
  isRoom: boolean,
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

    // check user id
    if (!session.user.id) {
      return {
        error: "User not found",
      };
    }

    // check if user has already added review
    const existingReview = await db.feedbacks.findFirst({
      where: {
        userId: session.user.id,
        [isRoom ? "roomReservationId" : "tableReservationId"]: id,
      },
    });

    // if review already exists
    if (existingReview) {
      return {
        error: "You have already added a review",
      };
    }

    // add review
    const review = await db.feedbacks.create({
      data: {
        ...data,
        [isRoom ? "roomReservationId" : "tableReservationId"]: id,
        userId: session.user.id!!,
      },
    });

    // return review
    return {
      success: "Review added successfully",
    };
  } catch (error) {
    return {
      error: "Failed to add review",
    };
  }
};
