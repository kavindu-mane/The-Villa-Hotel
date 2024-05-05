import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./actions/utils/user";
import { Role } from "@prisma/client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  events: {
    // Link OAuth accounts with verification
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user , account }) {
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
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
