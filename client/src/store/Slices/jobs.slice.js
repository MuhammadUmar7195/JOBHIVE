import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { 
    setAllAdminJobs,
    setAllJobs,
    setAllAppliedJobs,
    setSearchedQuery,
    setSingleJob,
    setSearchJobByText
} = jobSlice.actions;

export default jobSlice.reducer;