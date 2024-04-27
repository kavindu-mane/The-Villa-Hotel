"use server";

import { signIn } from "@/auth";
import { LoginFormSchema } from "@/validations";
import { AuthError } from "next-auth";
import { ZodIssue, ZodIssueCode, z } from "zod";
import { getUserByEmail } from "@/actions/utils/user";
import { getVerificationToken } from "@/lib/tokens";
import { sendEmails, setupVerificationEmailTemplate } from "@/lib/email";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Email does not exist!",
    };
  }

  if (!existingUser.emailVerified) {
    // create verification token
    const verificationToken = await getVerificationToken(existingUser.email);

    const url = `${process.env.DOMAIN}/api/auth/verify-email?token=${verificationToken.token}`;

    const template = await setupVerificationEmailTemplate(url , existingUser.name || "");

    const isSend = await sendEmails({
      to: email,
      subject: "Verify your email",
      body: template,
    });

    if (!isSend) {
      return {
        error: "Failed to send verification email!",
      };
    }

    return {
      success: "Verification email sent. Please check your inbox.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    // create custom issue for credential
    const issue: ZodIssue = {
      code: ZodIssueCode.custom,
      message: "Invalid email or password!",
      path: ["message"],
    };

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: {
              error: {
                issues: [issue],
              },
            },
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
