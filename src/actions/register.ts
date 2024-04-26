"use server";

import { RegisterFormSchema } from "@/validations";
import { ZodIssue, ZodIssueCode, z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validatedFields = RegisterFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

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

  return {
    success: "Verification email sent. Please check your inbox.",
  };
};
