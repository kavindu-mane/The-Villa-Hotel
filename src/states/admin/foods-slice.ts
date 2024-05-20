import { foodsDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type foodsState = {
  all: foodsDataTypes[] | null;
  current: foodsDataTypes | null;
};

const initialState: foodsState = {
  all: null,
  current: null,
};

const foodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    setAllFoods: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentFood: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllFoods, setCurrentFood } = foodSlice.actions;
export default foodSlice.reducer;
