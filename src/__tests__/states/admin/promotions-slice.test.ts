import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { offerDataTypes } from "@/types";
import promotionsSlice, {
  setAllPromotions,
  setCurrentPromotion,
} from "@/states/admin/promotions-slice";

// Mock data
const mockPromotions: offerDataTypes[] = [
  {
    id: "P1",
    code: "PROMO10",
    description: "10% off",
    discount: 10,
    validFrom: new Date("2023-01-01"),
    validTo: new Date("2023-12-31"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "P2",
    code: "PROMO20",
    description: "20% off",
    discount: 20,
    validFrom: new Date("2023-01-01"),
    validTo: new Date("2023-12-31"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockPromotion: offerDataTypes = {
  id: "P1",
  code: "PROMO10",
  description: "10% off",
  discount: 10,
  validFrom: new Date("2023-01-01"),
  validTo: new Date("2023-12-31"),
  createdAt: new Date(),
  updatedAt: new Date(),
};

test("should handle initial state", () => {
  const store = configureStore({ reducer: { promotions: promotionsSlice } });
  const state = store.getState().promotions;
  expect(state).toEqual({
    all: null,
    current: null,
  });
});

test("should handle setAllPromotions", () => {
  const store = configureStore({ reducer: { promotions: promotionsSlice } });
  store.dispatch(setAllPromotions(mockPromotions));
  const state = store.getState().promotions;
  expect(state.all).toEqual(mockPromotions);
});

test("should handle setCurrentPromotion", () => {
  const store = configureStore({ reducer: { promotions: promotionsSlice } });
  store.dispatch(setCurrentPromotion(mockPromotion));
  const state = store.getState().promotions;
  expect(state.current).toEqual(mockPromotion);
});