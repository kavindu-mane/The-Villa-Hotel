import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { roomReservationDataTypes } from "@/types";
import roomReservationSlice, {
  setAllRoomReservations,
  setCurrentRoomReservation,
} from "@/states/admin/room-reservations-slice";

// Mock data
const mockRoomReservations: roomReservationDataTypes[] = [
  {
    reservationNo: 1,
    roomId: "R101",
    total: 200,
    offerDiscount: 20,
    paidAmount: 180,
    userId: "U123",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    status: "confirmed",
    type: "single",
    bed: "One_Double_Bed",
    offer: {
      id: "O1",
      description: "10% off",
      discount: 10,
      code: "OFF10",
      createdAt: new Date(),
      updatedAt: new Date(),
      validFrom: new Date(),
      validTo: new Date(),
    },
    checkIn: new Date(),
    checkOut: new Date(),
    room: {
      id: "R101",
      type: "Deluxe",
      price: 200,
      beds: {
        data: ["One_Double_Bed"],
      },
      images: {
        data: ["room1.jpg", "room2.jpg"],
      },
      features: {
        data: ["TV", "AC"],
      },
      images360: "room1_360.jpg",
      number: 101,
      persons: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    reservationNo: 2,
    roomId: "R102",
    total: 300,
    offerDiscount: 30,
    paidAmount: 270,
    userId: "U124",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "0987654321",
    status: "pending",
    type: "double",
    bed: "One_Double_Bed",
    offer: {
      id: "O2",
      description: "15% off",
      discount: 15,
      code: "OFF15",
      createdAt: new Date(),
      updatedAt: new Date(),
      validFrom: new Date(),
      validTo: new Date(),
    },
    checkIn: new Date(),
    checkOut: new Date(),
    room: {
      id: "R102",
      type: "Deluxe",
      price: 300,
      beds: {
        data: ["One_Double_Bed"],
      },
      images: {
        data: ["room3.jpg", "room4.jpg"],
      },
      features: {
        data: ["TV", "AC"],
      },
      images360: "room2_360.jpg",
      number: 102,
      persons: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

const mockRoomReservation: roomReservationDataTypes = {
  reservationNo: 1,
  roomId: "R101",
  total: 200,
  offerDiscount: 20,
  paidAmount: 180,
  userId: "U123",
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  status: "confirmed",
  type: "single",
  bed: "One_Double_Bed",
  offer: {
    id: "O1",
    description: "10% off",
    discount: 10,
    code: "OFF10",
    createdAt: new Date(),
    updatedAt: new Date(),
    validFrom: new Date(),
    validTo: new Date(),
  },
  checkIn: new Date(),
  checkOut: new Date(),
  room: {
    id: "R101",
    type: "Deluxe",
    price: 200,
    images: {
      data: ["room1.jpg", "room2.jpg"],
    },
    features: {
      data: ["TV", "AC"],
    },
    beds: {
      data: ["One_Double_Bed"],
    },
    images360: "room1_360.jpg",
    number: 101,
    persons: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

test("should handle initial state", () => {
  const store = configureStore({
    reducer: { roomReservations: roomReservationSlice },
  });
  const state = store.getState().roomReservations;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllRoomReservations", () => {
  const store = configureStore({
    reducer: { roomReservations: roomReservationSlice },
  });
  store.dispatch(setAllRoomReservations(mockRoomReservations));
  const state = store.getState().roomReservations;
  expect(state.all).toEqual(mockRoomReservations);
});

test("should handle setCurrentRoomReservation", () => {
  const store = configureStore({
    reducer: { roomReservations: roomReservationSlice },
  });
  store.dispatch(setCurrentRoomReservation(mockRoomReservation));
  const state = store.getState().roomReservations;
  expect(state.current).toEqual(mockRoomReservation);
});
