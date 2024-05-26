"use server";

import { getVerificationTokenByEmail } from "@/actions/utils/verification-token";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db";
import { getResetPasswordTokenByEmail } from "@/actions/utils/password-reset-token";

// get verification token
export const getVerificationToken = async (email: string) => {
  // generate token
  const token = uuid();
  // set expiration date
  const expires = new Date(new Date().getTime() + 1000 * 3600);

  // check if token exists
  const existingToken = await getVerificationTokenByEmail(email);

  // if token exists, delete it
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // create new verification token
  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expiresAt: expires,
    },
  });

  // return verification token
  return verificationToken;
};

// get reset password token
export const getResetPasswordToken = async (email: string) => {
  // generate token
  const token = uuid();
  // set expiration date
  const expires = new Date(new Date().getTime() + 1000 * 3600);

  // check if token exists
  const existingToken = await getResetPasswordTokenByEmail(email);

  // if token exists, delete it
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  //  create new password reset token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      email,
      expiresAt: expires,
    },
  });

  // return password reset token
  return passwordResetToken;
};
