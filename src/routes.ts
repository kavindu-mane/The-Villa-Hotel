export const publicRoutes = [
  "/",
  "/auth/verify-email",
  "/contact-us",
  "/restaurant/*",
  "/customize",
  "/rooms/*",
];

export const privateRoutes = ["/dashboard"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";
