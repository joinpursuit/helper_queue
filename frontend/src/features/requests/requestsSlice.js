import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../auth/authSlice";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { getNewFirebaseIdToken } from "../auth/authSlice";

const API = apiURL();

export const fetchOpenRequest = () => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    let res = await axios({
      method: "get",
      url: `${API}/api/tickets/open_tickets/`,
      headers: {
        AuthToken: token,
      },
    });
    
    if (res.data.openTicket.length) {
      dispatch(updateRequest(res.data.openTicket[0]));
    } else {
      dispatch(updateRequest(null));
    }
  } catch (err) {
    console.log(err)
  }
};

export const createRequest = () => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

    let res = await axios({
      method: "post",
      url: `${API}/api/tickets`,
      headers: {
        AuthToken: token,
      },
      data: {
        body: "",
      },
    });
    dispatch(updateRequest(res.data.ticket));
  } catch (error) {
    console.log(error);
  }
};


export const deleteRequest = (email) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

      await axios({
        method: "delete",
        url: `${API}/api/tickets/close_tickets/${email}`,
        headers: {
          AuthToken: token,
        },
      });
    dispatch(updateRequest(null));
  } catch (error) {}
};

export const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    updateRequest: (state, { payload }) => payload,
  },
  extraReducers: {
    [logoutUser](){return null}
  },
});
export const { updateRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
export const selectRequest = (state) => state.request;
