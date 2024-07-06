import { RoomType, FoodType, BedTypes, TableType } from "@prisma/client";

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
  timeSlot?: string[];
  number?: string[];
  room_type?: string[];
  beds?: string[];
  features?: string[];
  persons?: string[];
  price?: string[];
  images?: string[];
  foodType?: string[];
  foodId?: string[];
  tableType?: string[];
  tableId?: string[];
  room?: string[];
  offer?: string[];
  description?: string[];
  code?: string[];
  validFrom?: string[];
  validTo?: string[];
  discount?: string[];
  images360?: string[];
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
  images360: string | undefined;
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

// type for minimal food data
export type minimalFoodData = {
  foodId: string;
  foodType: FoodType;
  name: string;
  price: number;
  description: string;
  images: {
    data: string[];
  };
};

// types for tables data
export type tablesDataTypes = {
  id: string;
  tableId: string;
  tableType: TableType;

  price: number;
  description: string;
  images: {
    data: string[];
  };
  createdAt: Date;
  updatedAt: Date;
};

// types for minimal table data
export type minimalTableData = {
  tableId: string;
  tableType: TableType;
  price: number;
  description: string;
  isAvailable: boolean;
  images: {
    data: string[];
  };
};

// types for offer data
export type offerDataTypes = {
  id: string;
  code: string;
  description: string;
  discount: number;
  validFrom: Date;
  validTo: Date;
  createdAt: Date;
  updatedAt: Date;
};

// types for room reservation data
export type roomReservationDataTypes = {
  reservationNo: number;
  roomId: string;
  total: number;
  offerDiscount: number;
  paidAmount: number;
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
  images360: string | null;
  images: {
    data: string[];
  };
  features: {
    data: string[];
  };
  _count: {
    roomReservation: number;
  };
};

// pending reservation response data
export type pendingReservationResponse = {
  room: {
    number: number;
    type: RoomType;
  };
  amount: number;
  offers: offerDataTypes[];
};

// types for table reservation data
export type tableReservationDataTypes = {
  reservationNo: number;
  tableId: string;
  userId?: string;
  foodReservationsId?: string;
  name: string;
  email: string;
  phone: string;
  date: Date;
  timeSlot: string;
  status: string;
  offerDiscount: number;
  total: number;
  table: tablesDataTypes;
  food: foodsReservationDataTypes;
};

//types for food reservation data
export type foodsReservationDataTypes = {
  foodId: string;
  name: string;
  price: number;
  quantity: number;
  specialRequirement: string;
};

//type for table reservation order summery
export type tableReservationOrderSummery = {
  date: Date;
  coins: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  foodReservation: {
    specialRequirement: string | null;
    foodReservationItems: {
      total: number;
      quantity: number;
      food: {
        foodId: string;
        name: string;
      };
    }[];
  }[];
  total: number;
  timeSlot: string;
  table: {
    tableId: string;
    tableType: TableType;
  };
};
