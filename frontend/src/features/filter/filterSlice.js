import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    rejected: false,
    wishlist: false,
    applied: true,
    phoneScreen: false,
    codingChallenge: false,
    techScreen: false,
    onsite: false,
    offer: false,
  },
  reducers: {
      updateFilter: (state, {payload}) => {
          state[payload] = !state[payload]
      }
  }
});
export const {updateFilter} = filterSlice.actions;
export default filterSlice.reducer;

export const selectFilter = state => state.filter;