import {PrismaClient} from "@prisma/client";

// Extend the global object to include a prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a new PrismaClient instance if it doesn't exist
export const db = globalThis.prisma || new PrismaClient();

// If we're not in production, set the prisma property on the global object
if(process.env.NODE_ENV !== "production") globalThis.prisma = db;