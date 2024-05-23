import { RoomType, FoodType } from "@prisma/client";

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
  number?: string[];
  room_type?: string[];
  beds?: string[];
  features?: string[];
  persons?: string[];
  price?: string[];
  images?: string[];
  foodType?: string[];
  foodId?: string[];
  room?: string[];
  offer?: string[];
  description?: string[];
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
  beds: {
    data: string[];
  };
  features: {
    data: string[];
  };
  images: {
    data: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

// types for foods data
export type foodsDataTypes = {
  id: string;
  foodId: string;
  foodType: FoodType;
  name: string;
  price: number;
  description: string;
  images: {
    data: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

// types for room reservation data
export type roomReservationDataTypes = {
  reservationNo: number;
  roomId: string;
  total: number;
  offer: number;
  pendingBalance: number;
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  bed: string;
  status: string;
  type: string;
  checkIn: Date;
  checkOut: Date;
  room: roomsDataTypes;
};
