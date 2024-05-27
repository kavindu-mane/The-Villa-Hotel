import { offerDataTypes } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

type promotionsState = {
  all: offerDataTypes[] | null;
  current: offerDataTypes | null;
};

const initialState: promotionsState = {
  all: null,
  current: null,
};

const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    setAllPromotions: (state, action) => {
      const payload = action.payload;
      state.all = payload;
    },

    setCurrentPromotion: (state, action) => {
      const payload = action.payload;
      state.current = payload;
    },
  },
});

export const { setAllPromotions, setCurrentPromotion } =
  promotionsSlice.actions;
export default promotionsSlice.reducer;
