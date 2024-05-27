"use client";

import { db } from "@/lib/db";

// get offer by id
export const getOfferById = async (id: string) => {
  try {
    const offer = await db.offer.findUnique({
      where: {
        id,
      },
    });
    return offer;
  } catch (e) {
    return null;
  }
};

// create offer
export const createOffer = async (
  name: string,
  description: string,
  discount: number,
  validFrom: Date,
  validTo: Date,
) => {
  try {
    const offer = await db.offer.create({
      data: {
        code: name,
        description,
        discount,
        validFrom,
        validTo,
      },
    });
    return offer;
  } catch (e) {
    return null;
  }
};

// update offer
export const updateOffer = async (
  id: string,
  name: string,
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
        code: name,
        description,
        discount,
        validFrom,
        validTo,
      },
    });
    return offer;
  } catch (e) {
    return null;
  }
};
