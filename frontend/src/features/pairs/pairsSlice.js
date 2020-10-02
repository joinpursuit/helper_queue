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

    let res = await axios({
      method: "get",
      url: `${API}/api/pairs/`,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(receivePairsLists(res.data.pair_lists));
  } catch (err) {
    dispatch(receivePairsLists([]));
  }
};


export const pairsSlice = createSlice({
  name: "pairs",
  initialState: {},
  reducers: {
    receivePairsLists: (state, { payload }) => {
        return payload.reduce((obj, pairList) => {
            obj[pairList.id] = pairList
        }, {})
    },
  },
  extraReducers: {
    [logoutUser]() {
      return {};
    },
  },
});
export const {
  receivePairsLists,
} = pairsSlice.actions;
export default pairsSlice.reducer;

export const selectPairLists = (state) => Object.values(state.pairs);
