import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { tableReservationDataTypes } from "@/types";
import tableReservationSlice, {
  setAllTableReservations,
  setCurrentTableReservation,
} from "@/states/admin/table-reservations-slice";

// Mock data
const mockTableReservations: tableReservationDataTypes[] = [
  {
    reservationNo: 1,
    tableId: "T101",
    total: 100,
    offerDiscount: 10,
    userId: "U123",
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    status: "confirmed",
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
    date: new Date(),
    food: {
      name: "Biryani",
      price: 100,
      specialRequirement: "No onions",
      foodId: "F101",
      quantity: 2,
    },
    timeSlot: "12:00 PM",
    table: {
      id: "T101",
      images: {
        data: ["table1.jpg", "table2.jpg"],
      },
      price: 100,
      tableId: "T101",
      tableType: "Four_Seat",
      description: "A dinner table",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
  {
    reservationNo: 2,
    tableId: "T102",
    total: 150,
    offerDiscount: 15,
    userId: "U124",
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "0987654321",
    status: "pending",
    date: new Date(),
    food: {
      name: "Pizza",
      price: 150,
      specialRequirement: "No olives",
      foodId: "F102",
      quantity: 1,
    },
    timeSlot: "12:00 PM",
    foodReservationsId: "FR102",
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
    table: {
      id: "T102",
      images: {
        data: ["table1.jpg", "table2.jpg"],
      },
      price: 150,
      tableId: "T102",
      tableType: "Four_Seat",
      description: "A lunch table",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
];

const mockTableReservation: tableReservationDataTypes = {
  reservationNo: 1,
  tableId: "T101",
  total: 100,
  offerDiscount: 10,
  date: new Date(),
  food: {
    name: "Biryani",
    price: 100,
    specialRequirement: "No onions",
    foodId: "F101",
    quantity: 2,
  },
  userId: "U123",
  name: "John Doe",
  email: "john@example.com",
  phone: "1234567890",
  status: "confirmed",
  timeSlot: "12:00 PM",
  foodReservationsId: "FR101",
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
  table: {
    id: "T101",
    images: {
      data: ["table1.jpg", "table2.jpg"],
    },
    price: 100,
    tableId: "T101",
    tableType: "Four_Seat",
    description: "A dinner table",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};

test("should handle initial state", () => {
  const store = configureStore({
    reducer: { tableReservations: tableReservationSlice },
  });
  const state = store.getState().tableReservations;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllTableReservations", () => {
  const store = configureStore({
    reducer: { tableReservations: tableReservationSlice },
  });
  store.dispatch(setAllTableReservations(mockTableReservations));
  const state = store.getState().tableReservations;
  expect(state.all).toEqual(mockTableReservations);
});

test("should handle setCurrentTableReservation", () => {
  const store = configureStore({
    reducer: { tableReservations: tableReservationSlice },
  });
  store.dispatch(setCurrentTableReservation(mockTableReservation));
  const state = store.getState().tableReservations;
  expect(state.current).toEqual(mockTableReservation);
});
