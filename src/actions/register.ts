"use server";

import { RegisterFormSchema } from "@/validations";
import { ZodIssue, ZodIssueCode, z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/actions/utils/user";
import { getVerificationToken } from "@/actions/utils/tokens";
import {
  sendEmails,
} from "@/actions/utils/email";
import { verificationEmailTemplate } from "@/templates/verification-email";

/**
 * Server action for register form
 */

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  try {
    // validate data in backend
    const validatedFields = RegisterFormSchema.safeParse(values);

    // check if validation failed and return errors
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.errors,
      };
    }

    // destructure data from validated fields
    const { email, password, name } = validatedFields.data;
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // check if email exists
    const existingUser = await getUserByEmail(email);

    // if email already exists
    if (existingUser) {
      // create custom issue for email
      const issue: ZodIssue = {
        code: ZodIssueCode.custom,
        message: "Email already exists",
        path: ["email"],
      };
      return {
        errors: {
          error: {
            issues: [issue],
          },
        },
      };
    }

    // create user
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // create verification token
    const verificationToken = await getVerificationToken(email);
    // generate new verification url
    const url = `${process.env.DOMAIN}/auth/verify-email?token=${verificationToken.token}`;

    // setup email template
    const template = verificationEmailTemplate(url, name || "");

    // send email
    const isSend = await sendEmails({
      to: email,
      subject: "Verify your email",
      body: template,
    });

    // if email not sent
    if (!isSend) {
      return {
        error: "Failed to send verification email!",
      };
    }

    // if no error return success
    return {
      success: "Verification email sent. Please check your inbox.",
    };
  } catch (error) {
    // if error return error
    return {
      error: "Something went wrong!",
    };
  }
};
