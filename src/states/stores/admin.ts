import { configureStore } from "@reduxjs/toolkit";
import { roomReducer } from "../admin";

export const adminStore = configureStore({
  reducer: {
    rooms_admin: roomReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AdminState = ReturnType<typeof adminStore.getState>;
export type AppDispatch = typeof adminStore.dispatch;
