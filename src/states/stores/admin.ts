import { configureStore } from "@reduxjs/toolkit";
import { foodReducer, roomReducer, roomReservationReducer } from "../admin";

export const adminStore = configureStore({
  reducer: {
    rooms_admin: roomReducer,
    foods_admin: foodReducer,
    rooms_reservation_admin: roomReservationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AdminState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;
