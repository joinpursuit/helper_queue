import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { getNewFirebaseIdToken } from "../auth/authSlice";

const API = apiURL();

export const fetchOpenTickets = () => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

    let res = await axios({
      method: "get",
      url: `${API}/api/tickets`,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(receiveTickets(res.data.tickets));
  } catch (err) {
    dispatch(receiveTickets([]));
  }
};

export const destroyTicket = (ticket) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

    await axios({
      method: "delete",
      url: `${API}/api/tickets/close_tickets/${ticket.email}`,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(removeTicket(ticket.email));
  } catch (error) {
  }
};

export const ticketsSlice = createSlice({
  name: "tickets",
  initialState: [],
  reducers: {
    receiveTickets: (state, { payload }) => payload,
    removeTicket: (state, { payload }) => {
      let idx = state.findIndex((ticket) => ticket.email === payload);
      if (idx > -1) {
        state.splice(idx, 1);
      }
      return state;
    },
    receiveTicket: (state, { payload }) => {
      state.push(payload);
    },
  },
  extraReducers: {
    logoutUser: () => []
  },
});
export const { receiveTickets,receiveTicket, removeTicket } = ticketsSlice.actions;
export default ticketsSlice.reducer;
export const selectTickets = (state) => state.tickets;
