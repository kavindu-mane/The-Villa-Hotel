import authConfig from "./auth.config";
import NextAuth from "next-auth";
export const { auth: middleware } = NextAuth(authConfig);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
