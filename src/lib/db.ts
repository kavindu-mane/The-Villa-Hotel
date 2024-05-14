import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const prismaClientSingleton = () => {
  return new PrismaClient().$extends(withAccelerate());
};

// Extend the global object to include a prisma property
declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

// Create a new PrismaClient instance if it doesn't exist
export const db = globalThis.prisma ?? prismaClientSingleton();

// If we're not in production, set the prisma property on the global object
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
