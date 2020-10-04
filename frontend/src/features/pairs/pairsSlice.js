import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { logoutUser } from "../auth/authSlice";
import { getNewFirebaseIdToken } from "../auth/authSlice";

const API = apiURL();

export const fetchAllPairLists = () => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

    const res = await axios({
      method: "get",
      url: `${API}/api/pairs`,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(receivePairLists(res.data.pair_lists));
  } catch (err) {
    dispatch(receivePairLists([]));
  }
};

export const fetchPairList = (id) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    const res = await axios({
      method: "get",
      url: `${API}/api/pairs/${id}`,
      headers: {
          AuthToken: token
      }
    });
    dispatch(receivePairList(res.data.pair_list))
  } catch (err) {
    console.log(err);
  }
};

export const updatePairList = (data) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    const res = await axios({
      method: "put",
      url: `${API}/api/pairs/${data.id}`,
      data: data,
      headers: {
          AuthToken: token
      }
    });
    dispatch(receivePairList(res.data.pair_list))
  } catch (err) {
    console.log(err);
  }
};

export const createPairList = (data) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;

    const res = await axios({
      method: "post",
      url: `${API}/api/pairs`,
      data: data,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(receivePairList(res.data.pair_list));
  } catch (error) {
    console.log(error);
  }
};

export const pairsSlice = createSlice({
  name: "pairs",
  initialState: {},
  reducers: {
    receivePairLists: (state, { payload }) => {
      return payload.reduce((obj, pairList) => {
        obj[pairList.id] = pairList;
        return obj;
      }, {});
    },
    receivePairList: (state, { payload }) => {
      state[payload.id] = payload;
    },
  },
  extraReducers: {
    [logoutUser]() {
      return {};
    },
  },
});
export const {
  receivePairLists,
  receivePairList,
} = pairsSlice.actions;
export default pairsSlice.reducer;

export const selectPairLists = (state) => Object.values(state.pairs);
