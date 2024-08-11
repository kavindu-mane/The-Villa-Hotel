import { expect, test } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import sessionSlice, {
  setSession,
  removeSession,
} from "@/states/user/user-slice";

// Mock data
const mockSession: Session = {
  user: {
    name: "John Doe",
    email: "test@test.com",
    image: "https://example.com/image.jpg",
    role: "ADMIN",
    id: "123",
  },
  expires: "2023-12-31T23:59:59.999Z",
};

test("should handle initial state", () => {
  const store = configureStore({ reducer: { session: sessionSlice } });
  const state = store.getState().session;
  expect(state).toEqual({
    session: null,
  });
});

test("should handle setSession", () => {
  const store = configureStore({ reducer: { session: sessionSlice } });
  store.dispatch(setSession(mockSession));
  const state = store.getState().session;
  expect(state.session).toEqual(mockSession);
});

test("should handle removeSession", () => {
  const store = configureStore({ reducer: { session: sessionSlice } });
  store.dispatch(setSession(mockSession)); // Set session first
  store.dispatch(removeSession());
  const state = store.getState().session;
  expect(state.session).toBeNull();
});
