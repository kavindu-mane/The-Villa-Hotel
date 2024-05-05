"use server";

import { NewPasswordSchema } from "@/validations";
import z from "zod";
import { getResetPasswordTokenByToken } from "./utils/password-reset-token";
import { getUserByEmail } from "./utils/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

/**
 * Server action for new password form
 */

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  // check if token is available
  if (!token) {
    return { error: "Missing token!" };
  }

  // validate data in backend
  const validatedFields = NewPasswordSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // destructure data from validated fields
  const { password } = values;

  // check if token exists
  const existingToken = await getResetPasswordTokenByToken(token);

  // if token does not exist
  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  // check if token has expired
  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  // if token has expired
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // check if email exists
  const existingUser = await getUserByEmail(existingToken.email);

  // if email does not exist
  if (!existingUser) {
    return { error: "Email not found!" };
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // update user password
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  // delete token
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  // if no error return success
  return {
    success: "Password updated!",
  };
};
