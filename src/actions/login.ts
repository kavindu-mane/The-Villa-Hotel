"use server";

import { signIn } from "@/auth";
import { LoginFormSchema } from "@/validations";
import { AuthError } from "next-auth";
import { ZodIssue, ZodIssueCode, z } from "zod";
import { getUserByEmail } from "@/actions/utils/user";
import { getVerificationToken } from "@/lib/tokens";
import { sendEmails, setupVerificationEmailTemplate } from "@/lib/email";

/**
 * Server action for login form
 */

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  // validate data in backend
  const validatedFields = LoginFormSchema.safeParse(values);

  // check if validation failed and return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  // destructure data from validated fields
  const { email, password } = validatedFields.data;

  // check if email exists
  const existingUser = await getUserByEmail(email);

  // if email , user does not exist or password is not available
  if (!existingUser || !existingUser.password || !existingUser.email) {
    return {
      error: "Email does not exist!",
    };
  }

  // if email is not verified
  if (!existingUser.emailVerified) {
    // create verification token
    const verificationToken = await getVerificationToken(existingUser.email);

    // generate new verification token
    const url = `${process.env.DOMAIN}/auth/verify-email?token=${verificationToken.token}`;

    // setup email template
    const template = await setupVerificationEmailTemplate(url , existingUser.name || "");

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

    // if no error
    return {
      success: "Verification email sent. Please check your inbox.",
    };
  }

  // if user is verified
  try {
    // sign in user with next-auth credentials provider
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
