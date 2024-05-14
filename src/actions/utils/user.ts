import { db } from "@/lib/db";

// get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      cacheStrategy: { ttl: 60 },
    });
    return user;
  } catch (e) {
    return null;
  }
};

// get user by id
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
      cacheStrategy: { ttl: 60 },
    });
    return user;
  } catch (e) {
    return null;
  }
};
