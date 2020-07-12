import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {currentUser: null},
    reducers: {
        updateCurrentUser: (state, {payload}) => {
            state.currentUser = payload;
        }
    }
})

export const { updateCurrentUser } = authSlice.actions;
export default authSlice.reducer;