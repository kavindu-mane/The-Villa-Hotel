"use server";

import { db } from "@/lib/db";

// increase coins
export const increaseCoins = async (userId: string, coins: number) => {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        coins: {
          increment: coins,
        },
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};

// decrease coins
export const decreaseCoins = async (userId: string, coins: number) => {
  try {
    const user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        coins: {
          decrement: coins,
        },
      },
    });
    return user;
  } catch (e) {
    return null;
  }
};
