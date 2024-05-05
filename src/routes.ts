// Define all routes here
export const publicRoutes = [
  "/",
  "/auth/verify-email",
  "/contact-us",
  "/restaurant/*",
  "/customize",
  "/rooms/*",
];

// Define all routes here
export const privateRoutes = ["/dashboard"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
];

// Define all API routes here
export const apiAuthPrefix = "/api/auth";

// Define default login redirect
export const DEFAULT_LOGIN_REDIRECT = "/";
