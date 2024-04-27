"use server";

import z from "zod";
import { ResetPasswordSchema } from "@/validations";
import { getUserByEmail } from "./utils/user";
import { sendEmails, setupResetPasswordEmailTemplate } from "@/lib/email";
import { getResetPasswordToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validatedField = ResetPasswordSchema.parse(values);

  if (!validatedField) {
    return {
      error: "Invalid email.",
    };
  }

  const { email } = validatedField;

  const user = await getUserByEmail(email);
  if (!user || !user.email) {
    return {
      error: "Email not found.",
    };
  }

  const resetToken = await getResetPasswordToken(user.email);

  const url = `${process.env.DOMAIN}/auth/reset-password?token=${resetToken?.token}`;

  const template = await setupResetPasswordEmailTemplate(url, user.name || "");

  const isSend = await sendEmails({
    to: email,
    subject: "Reset Password",
    body: template,
  });

  if (!isSend) {
    return {
      error: "Failed to send verification email!",
    };
  }
  return {
    success: "Reset link sent to your email.",
  };
};
