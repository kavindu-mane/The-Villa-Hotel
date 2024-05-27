import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "../user";

export const sessionStore = configureStore({
  reducer: {
    session: sessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type UserState = ReturnType<typeof sessionStore.getState>;
export type AppDispatchUser = typeof sessionStore.dispatch;