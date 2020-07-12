import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: "pagination",
    initialState: { startIdx: 0, endIdx: 15, page: 0}, 
    reducers: {
        updateNumberOfRows: (state, { payload }) => {
            state["endIdx"] = state.startIdx + Number(payload);
        },
        nextPage: (state, { payload }) => {
            const diff = state.endIdx - state.startIdx;
            state["startIdx"] = payload;
            state["endIdx"] = payload + diff; 
        }, 
        resetPage: (state) => {
            const diff = state.endIdx - state.startIdx;
            return {startIdx: 0, endIdx: diff, page: 0}
        }, 
        updatePage: (state, { payload }) => {
            state.page = payload
        }
    }
})

export const { updateNumberOfRows, nextPage, resetPage, updatePage } = paginationSlice.actions;
export default paginationSlice.reducer;

export const selectPagination = (state) => state.pagination;