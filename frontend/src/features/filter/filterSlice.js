import { createSlice } from "@reduxjs/toolkit";
const initState = {
    rejected: false,
    wishlist: false,
    applied: true,
    phoneScreen: false,
    codingChallenge: false,
    techScreen: false,
    onsite: false,
    offer: false,
  }
export const filterSlice = createSlice({
  name: "filter",
  initialState: initState,
  reducers: {
    updateFilter: (state, { payload }) => {
      state[payload] = !state[payload];
    },
  },
  extraReducers: {
    logoutUser: () => initState 
  },
});
export const {updateFilter} = filterSlice.actions;
export default filterSlice.reducer;

export const selectFilter = state => state.filter;