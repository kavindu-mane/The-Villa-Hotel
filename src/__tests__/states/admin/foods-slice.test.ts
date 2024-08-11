import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { foodsDataTypes } from "@/types";
import foodSlice, {
  setAllFoods,
  setCurrentFood,
} from "@/states/admin/foods-slice";

// Mock data
const mockFoods: foodsDataTypes[] = [
  {
    id: "1",
    foodId: "F101",
    foodType: "Appetizer",
    name: "Veggie Burger",
    price: 10,
    description: "A delicious veggie burger",
    images: {
      data: ["image1.jpg", "image2.jpg"],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    foodId: "F102",
    foodType: "Desert",
    name: "Chicken Burger",
    price: 12,
    description: "A delicious chicken burger",
    images: {
      data: ["image3.jpg", "image4.jpg"],
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockFood: foodsDataTypes = {
  id: "1",
  foodId: "F101",
  foodType: "Kottu",
  name: "Veggie Burger",
  price: 10,
  description: "A delicious veggie burger",
  images: {
    data: ["image1.jpg", "image2.jpg"],
  },
  createdAt: new Date(),
  updatedAt: new Date(),
};

test("should handle initial state", () => {
  const store = configureStore({ reducer: { foods: foodSlice } });
  const state = store.getState().foods;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllFoods", () => {
  const store = configureStore({ reducer: { foods: foodSlice } });
  store.dispatch(setAllFoods(mockFoods));
  const state = store.getState().foods;
  expect(state.all).toEqual(mockFoods);
});

test("should handle setCurrentFood", () => {
  const store = configureStore({ reducer: { foods: foodSlice } });
  store.dispatch(setCurrentFood(mockFood));
  const state = store.getState().foods;
  expect(state.current).toEqual(mockFood);
});
