import { createSlice } from "@reduxjs/toolkit";
import { getFirebaseIdToken } from '../../util/firebaseFunctions';
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

export const getNewFirebaseIdToken = () => async (dispatch) => {
  try {
    let token = await getFirebaseIdToken();
    return dispatch(updateToken(token));
  } catch (err) {
    console.log(err)
  }
};

export const enrollClass = (classList) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
   const res = await axios({
     method: "post",
     url: `${API}/api/enrollclass`,
     headers: {
       AuthToken: token,
     },
     data: classList,
   });
   debugger
  } catch (err) {
    debugger
  }
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
        }, 
        logoutUser: (_, { payload }) =>( {currentUser: null, token: null})
    }
})

export const { updateCurrentUser, updateToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;