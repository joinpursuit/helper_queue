import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { logoutUser } from "../auth/authSlice";

export const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    updateSearch: (_, { payload }) => payload,
    clearInput: () => "",
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, () => "")
  },
});
export const { updateSearch, clearInput } = searchSlice.actions; 
export default searchSlice.reducer;
export const selectSearch = (state: RootState) => state.search;