import { createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";

type sessionSlice = {
  session: Session | null;
};

const initialState: sessionSlice = {
  session: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession: (state, action) => {
      const payload = action.payload;
      state.session = payload;
    },
    removeSession: (state) => {
      state.session = null;
    },
  },
});

export const { setSession, removeSession } = sessionSlice.actions;
export default sessionSlice.reducer;
