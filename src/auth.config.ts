import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginFormSchema } from "./validations";
import { getUserByEmail, getUserById } from "./actions/utils/user";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

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
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth accounts with verification
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user.id || "");

      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      return true;
    },
    // Add user id and role to session
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Role;
      }

      return session;
    },
    // Add role to JWT
    async jwt({ token }) {
      if (!token?.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;
      return token;
    },
    // redirect to original callbackUrl
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      const isRelativeUrl = url.startsWith("/");
      if (isRelativeUrl) {
        return `${baseUrl}${url}`;
      }

      const isSameOriginUrl = new URL(url).origin === baseUrl;
      const alreadyRedirected = url.includes("callbackUrl=");
      if (isSameOriginUrl && alreadyRedirected) {
        const originalCallbackUrl = decodeURIComponent(
          url.split("callbackUrl=")[1],
        );

        return originalCallbackUrl;
      }

      if (isSameOriginUrl) {
        return url;
      }

      return baseUrl;
    },
  },
} satisfies NextAuthConfig;
