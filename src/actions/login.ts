"use server";

import { signIn } from "@/auth";
import { LoginFormSchema } from "@/validations";
import { AuthError } from "next-auth";
import { ZodIssue, ZodIssueCode, z } from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  const { email, password } = validatedFields.data;

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
