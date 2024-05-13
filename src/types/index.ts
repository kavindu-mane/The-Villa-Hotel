import { RoomType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";

// types for validation error
export type errorTypes = {
  email?: string[];
  password?: string[];
  name?: string[];
  repeat_password?: string[];
  message?: string;
  remark?: string[];
  phone?: string[];
  table?: string[];
  menu?: string[];
  date?: string[];
  time_slot?: string[];
};

// types for menu selection
export type menuSelectionTypes = {
  id: number;
  qty: number;
};

// types for rooms data
export type roomsDataTypes = {
  id: string;
  number: number;
  type: RoomType;
  price: number;
  persons: number;
  beds: JsonValue;
  features: JsonValue;
  createdAt: Date;
  updatedAt: Date;
}[];
