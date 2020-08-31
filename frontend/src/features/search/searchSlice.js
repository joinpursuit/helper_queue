import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from "../auth/authSlice";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearch: (state, { payload }) => payload,
    clearInput: () => "",
  },
  extraReducers: {
    [logoutUser](){return ""}
  },
});
export const { updateSearch, clearInput } = searchSlice.actions; 
export default searchSlice.reducer;
export const selectSearch = (state) => state.search;