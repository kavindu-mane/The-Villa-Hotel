import { tablesDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type tablesState = {
  all: tablesDataTypes[] | null;
  current: tablesDataTypes | null;
};

const initialState: tablesState = {
  all: null,
  current: null,
};

const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setAllTables: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentTable: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllTables, setCurrentTable } = tableSlice.actions;
export default tableSlice.reducer;
