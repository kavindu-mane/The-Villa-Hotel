import { configureStore } from "@reduxjs/toolkit";
import {
  foodReducer,
  roomReducer,
  tableReducer,
  roomReservationReducer,
  promotionsReducer,
  tableReservationReducer,
} from "../admin";

export const adminStore = configureStore({
  reducer: {
    rooms_admin: roomReducer,
    foods_admin: foodReducer,
    tables_admin: tableReducer,
    rooms_reservation_admin: roomReservationReducer,
    tables_reservation_admin: tableReservationReducer,
    promotions_admin: promotionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AdminState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;
