import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { tablesDataTypes } from "@/types";
import tableSlice, {
  setAllTables,
  setCurrentTable,
} from "@/states/admin/tables-slice";

// Mock data
const mockTables: tablesDataTypes[] = [
  {
    id: "1",
    tableId: "T101",
    tableType: "Four_Seat",
    price: 100,
    description: "A large dining table",
    images: {
      data: ["image1.jpg", "image2.jpg"],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    tableId: "T102",
    tableType: "Six_Seat",
    price: 50,
    description: "A small coffee table",
    images: {
      data: ["image3.jpg", "image4.jpg"],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockTable: tablesDataTypes = {
  id: "1",
  tableId: "T101",
  tableType: "Two_Seat",
  price: 100,
  description: "A large dining table",
  images: {
    data: ["image1.jpg", "image2.jpg"],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

test("should handle initial state", () => {
  const store = configureStore({ reducer: { tables: tableSlice } });
  const state = store.getState().tables;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllTables", () => {
  const store = configureStore({ reducer: { tables: tableSlice } });
  store.dispatch(setAllTables(mockTables));
  const state = store.getState().tables;
  expect(state.all).toEqual(mockTables);
});

test("should handle setCurrentTable", () => {
  const store = configureStore({ reducer: { tables: tableSlice } });
  store.dispatch(setCurrentTable(mockTable));
  const state = store.getState().tables;
  expect(state.current).toEqual(mockTable);
});
