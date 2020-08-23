import { createSlice } from "@reduxjs/toolkit";
import { getFirebaseIdToken } from '../../util/firebaseFunctions';

export const getNewFirebaseIdToken = () => async (dispatch) => {
  try {
    let token = await getFirebaseIdToken();
    dispatch(updateToken(token));
  } catch (err) {}
};



const authSlice = createSlice({
    name: "auth",
    initialState: {currentUser: null, token: null},
    reducers: {
        updateCurrentUser: (state, {payload}) => {
            state.currentUser = payload;
        }, 
        updateToken: (state, { payload }) => {
            state.token = payload; 
        }
    }
})

export const { updateCurrentUser, updateToken } = authSlice.actions;
export default authSlice.reducer;