import { RoomType, FoodType, BedTypes } from "@prisma/client";

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
    data: BedTypes[];
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

// types for offer data
export type offerDataTypes = {
  id: string;
  code: string;
  description: string;
  discount: number;
  validFrom: Date;
  validTo: Date;
};

// types for room reservation data
export type roomReservationDataTypes = {
  reservationNo: number;
  roomId: string;
  total: number;
  offerDiscount: number;
  pendingBalance: number;
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  status: string;
  type: string;
  bed: BedTypes;
  offer: offerDataTypes;
  checkIn: Date;
  checkOut: Date;
  room: roomsDataTypes;
};

// minimal room reservation data
export type minimalRoomReservationData = {
  number: number;
  type: RoomType;
  price: number;
  persons: number;
  images: {
    data: string[];
  };
  features: {
    data: string[];
  };
  _count: {
    reservation: number;
  };
};

// pending reservation response data
export type pendingReservationResponse = {
  room: {
    number: number;
    type: RoomType;
  };
  amount: number;
};
