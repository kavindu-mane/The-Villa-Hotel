import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginFormSchema } from "./validations";
import { getUserByEmail } from "./actions/utils/user";
import bcrypt from "bcryptjs";

// NextAuth configuration
export default {
  providers: [
    // OAuth authentication providers
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Credentials authentication provider
    Credentials({
      async authorize(credentials) {
        // Validate the fields
        const validatedFields = LoginFormSchema.safeParse(credentials);

        // Check if validation failed
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // Check if the user exists and the password matches
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          // Check if the password matches
          const passwordMatch = await bcrypt.compare(password, user.password);

          // Return the user if the password matches
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
