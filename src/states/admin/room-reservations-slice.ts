import { roomReservationDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type roomReservationsState = {
  all: roomReservationDataTypes[] | null;
  current: roomReservationDataTypes | null;
};

const initialState: roomReservationsState = {
  all: null,
  current: null,
};

const roomReservationSlice = createSlice({
  name: "roomReservations",
  initialState,
  reducers: {
    setAllRoomReservations: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentRoomReservation: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllRoomReservations, setCurrentRoomReservation } =
  roomReservationSlice.actions;
export default roomReservationSlice.reducer;
