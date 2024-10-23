"use server";

import { db } from "@/lib/db";

// create offer
export const createPromotion = async (
  code: string,
  description: string,
  discount: number,
  validFrom: Date,
  validTo: Date,
) => {
  try {
    const offer = await db.offer.create({
      data: {
        code,
        description,
        discount,
        validFrom,
        validTo,
      },
    });
    return offer;
  } catch (e) {
    console.log(e)
    return null;
  }
};

// update offer
export const updatePromotion = async (
  id: string,
  code: string,
  description: string,
  discount: number,
  validFrom: Date,
  validTo: Date,
) => {
  try {
    const offer = await db.offer.update({
      where: {
        id,
      },
      data: {
        code,
        description,
        discount,
        validFrom,
        validTo,
      },
    });
    return offer;
  } catch (e) {
    console.log(e)
    return null;
  }
};
