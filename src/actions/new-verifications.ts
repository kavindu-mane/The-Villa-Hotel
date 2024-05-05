"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "./utils/user";
import { getVerificationTokenByToken } from "./utils/verification-token";

/**
 * Server action for new verification
 */

export const newVerification = async (token: string) => {
  // check if token is available
  const existingToken = await getVerificationTokenByToken(token);

  // if token does not exist
  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  // check if token has expired
  const hasExpired = new Date() > new Date(existingToken.expiresAt);

  if (hasExpired) {
    return {
      error: "Token has expired!",
    };
  }

  // check if email exists
  const existingUser = await getUserByEmail(existingToken.email);

  // if email does not exist
  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  // update user emailVerified
  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  // delete verification token
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  // if no error return success
  return {
    success: "Email verified!",
  };
};
