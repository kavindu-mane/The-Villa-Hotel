"use server";

import z from "zod";
import { ResetPasswordSchema } from "@/validations";
import { getUserByEmail } from "./utils/user";
import { sendEmails, setupResetPasswordEmailTemplate } from "@/lib/email";
import { getResetPasswordToken } from "@/lib/tokens";

/**
 * Server action for reset password form
 */

export const reset = async (values: z.infer<typeof ResetPasswordSchema>) => {
  // validate data in backend
  const validatedField = ResetPasswordSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedField.success) {
    return {
      error: "Invalid email.",
    };
  }

  // destructure data from validated fields
  const { email } = validatedField.data;

  // check if email exists
  const user = await getUserByEmail(email);
  // if email or user does not exist
  if (!user || !user.email) {
    return {
      error: "Email not found.",
    };
  }

  // get reset token
  const resetToken = await getResetPasswordToken(user.email);
  // generate new url with reset token
  const url = `${process.env.DOMAIN}/auth/reset-password?token=${resetToken?.token}`;
  // setup email template
  const template = await setupResetPasswordEmailTemplate(url, user.name || "");

  // send email
  const isSend = await sendEmails({
    to: email,
    subject: "Reset Password",
    body: template,
  });

  // if email not sent
  if (!isSend) {
    return {
      error: "Failed to send verification email!",
    };
  }

  // if no error return success message
  return {
    success: "Reset link sent to your email.",
  };
};
