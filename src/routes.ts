// Define all routes here
export const privateRoutes = ["/user"];

// Define all admin routes here
export const adminRoutesPrefix = "/admin";

// Define all auth routes here
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

export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/admin";
