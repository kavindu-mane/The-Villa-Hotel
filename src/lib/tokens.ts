import { getVerificationTokenByEmail } from "@/actions/utils/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/actions/utils/password-reset-token";

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

export const getResetPasswordToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 1000 * 3600);

  const existingToken = await getResetPasswordTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expiresAt: expires,
    },
  });

  return passwordResetToken;
};
