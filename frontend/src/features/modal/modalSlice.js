import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from '../auth/authSlice'
const initState =  {
           jobFormShow: false,
           selectedJob: null,
           jobTimelineShow: false,
         }
export const modalSlice = createSlice({
  name: "modal",
  initialState: initState,
  reducers: {
    setJobFormShow: (state, { payload }) => {
      state.jobFormShow = payload;
    },
    setTimelineShow: (state, { payload }) => {
      state.jobTimelineShow = payload;
    },
    setSelectedJob: (state, { payload }) => {
      state.selectedJob = payload;
    },
  },
  extraReducers: {
    [logoutUser]() { return initState }
  },
});

export const {
         setJobFormShow,
         setTimelineShow,
         setSelectedJob,
       } = modalSlice.actions;
export default modalSlice.reducer; 