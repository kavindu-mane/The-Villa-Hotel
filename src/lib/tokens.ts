import { getVerificationTokenByEmail } from "@/actions/utils/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";

export const getVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expiresAt: expires,
    },
  });

  return verificationToken;
};
