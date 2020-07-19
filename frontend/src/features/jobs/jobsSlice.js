import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

const normalize = (arr) => {
  return arr.reduce((acc, el) => {
    acc[el.id] = {...acc[el.id], ...el};
    return acc;
  }, {});
};

export const createJob = (job, token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "post",
      url: `${API}/api/jobs`,
      headers: {
        AuthToken: token,
      },
      data: job,
    });

    dispatch(receiveJob(res.data.job));
  } catch (err) {}
};

export const fetchAllJobs = (token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API}/api/jobs`,
      headers: {
        AuthToken: token,
      },
    });

    dispatch(receiveJobs(normalize(res.data.jobs)));
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateJob = (job, token) => async (dispatch) => {
  try {
    let res = await axios({
      method: "put",
      url: `${API}/api/jobs/${job.id}`,
      headers: {
        AuthToken: token,
      },
      data: job,
    });
    dispatch(receiveJob(res.data.job));
  } catch (err) {}
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {},
  reducers: {
    receiveJobs: (state, { payload }) => payload,
    receiveJob: (state, { payload }) => {
      state[payload.id] = {...state[payload.id], ...payload};
    },
  },
});

export const { receiveJobs, receiveJob } = jobsSlice.actions;
export default jobsSlice.reducer;

export const selectJobs = (state) => Object.values(state.jobs).reverse();
export const selectJobCount = (state) =>
  Object.values(state.jobs).filter((job) => job.status !== "wishlist").length;

export const selectFilteredJobs = (state) => {
  let allJobs = Object.values(state.jobs);
  let filters = state.filter;
  let searchTerm = state.search;
  allJobs = allJobs.filter(
    (job) =>
      filters[job.status] &&
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  allJobs.sort((a, b) => {
    return new Date(b.last_modified) - new Date(a.last_modified);
  });
  return allJobs;
};
