import { tableReservationDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type tableReservationsState = {
  all: tableReservationDataTypes[] | null;
  current: tableReservationDataTypes | null;
};

const initialState: tableReservationsState = {
  all: null,
  current: null,
};

const tableReservationSlice = createSlice({
  name: "tableReservations",
  initialState,
  reducers: {
    setAllTableReservations: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentTableReservation: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllTableReservations, setCurrentTableReservation } =
  tableReservationSlice.actions;
export default tableReservationSlice.reducer;
