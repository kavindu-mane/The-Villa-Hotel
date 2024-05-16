import { roomsDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type roomsState = {
  all: roomsDataTypes[] | null;
  current: roomsDataTypes | null;
};

const initialState: roomsState = {
  all: null,
  current: null,
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setAllRooms: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentRoom: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllRooms, setCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
