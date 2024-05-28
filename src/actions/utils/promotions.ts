"use server";

import { db } from "@/lib/db";

// get offer by code
export const getPromotionByCode = async (code: string) => {
  try {
    const offer = await db.offer.findUnique({
      where: {
        code,
      },
    });
    return offer;
  } catch (e) {
    return null;
  }
};

// get offers with pagination
export const getPromotions = async (page: number, limit: number) => {
  // get pages count in the database
  let pages = (await db.rooms.count()) / limit;
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
    const offers = await db.offer.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { offers, pages, page };
  } catch (e) {
    return null;
  }
};
