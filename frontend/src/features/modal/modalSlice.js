import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: "modal", 
    initialState: {show: false, selectedJob: null}, 
    reducers: {
        setShow: (state, {payload}) => { state.show = payload},
        setSelectedJob: (state, { payload}) => {state.selectedJob = payload}
    }
})

export const { setShow, setSelectedJob } = modalSlice.actions;
export default modalSlice.reducer; 