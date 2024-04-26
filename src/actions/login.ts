"use server";

import { LoginFormSchema } from "@/validations";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginFormSchema>) => {
  const validatedFields = LoginFormSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.errors,
    };
  }

  return {
    success: "Login successful!",
  };
};
