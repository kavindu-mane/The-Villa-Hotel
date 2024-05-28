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
export const getPromotions = async (
  page: number,
  limit: number,
  select?: {
    id?: boolean;
    code?: boolean;
    description?: boolean;
    discount?: boolean;
    validFrom?: boolean;
    validTo?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  },
) => {
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
      select: {
        id: select?.id || true,
        code: select?.code || true,
        description: select?.description || true,
        discount: select?.discount || true,
        validFrom: select?.validFrom || true,
        validTo: select?.validTo || true,
        createdAt: select?.createdAt || true,
        updatedAt: select?.updatedAt || true,
      },
    });
    return { offers, pages, page };
  } catch (e) {
    return null;
  }
};
