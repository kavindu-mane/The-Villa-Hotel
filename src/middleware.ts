import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import {
  DEFAULT_ADMIN_LOGIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  adminRoutesPrefix,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from "@/routes";
import { Role } from "@prisma/client";
const { auth } = NextAuth(authConfig);

// Middleware to check if user is authenticated
export default auth((req) => {
  // Get the response object
  const { nextUrl } = req;
  // Check if user is authenticated
  const isLoggedIn = !!req.auth;

  // Check if the route is an API route
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  // Check if the route is an auth route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // Check if the route is a private route
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  // Check if the route is an admin route
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix);

  // Redirect user if not authenticated
  if (isApiAuthRoute) {
    return;
  }

  // Redirect user if not authenticated
  if (isAuthRoute) {
    if (isLoggedIn) {
      if (req.auth?.user.role === Role.ADMIN) {
        return Response.redirect(
          new URL(DEFAULT_ADMIN_LOGIN_REDIRECT, nextUrl),
        );
      } else {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
    }
    return;
  }

  // Redirect admin if not authenticated
  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Redirect user is request admin action and user is not admin
  if (isAdminRoute && isLoggedIn) {
    if (req.auth?.user.role !== Role.ADMIN) {
      return Response.redirect(new URL("/auth/login", nextUrl));
    }
  }

  // Redirect user if not authenticated
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  // Redirect user if authenticated
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
