"use server";

import { db } from "@/lib/db";

export const getLastTenReviews = async () => {
  try {
    const reviews = await db.feedbacks.findMany({
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return {
      reviews,
    };
  } catch (error) {
    return {
      error: "Failed to get reviews",
    };
  }
};
