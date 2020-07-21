import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
         name: "modal",
         initialState: {
           jobFormShow: false,
           selectedJob: null,
           jobTimelineShow: false,
         },
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
       });

export const {
         setJobFormShow,
         setTimelineShow,
         setSelectedJob,
       } = modalSlice.actions;
export default modalSlice.reducer; 