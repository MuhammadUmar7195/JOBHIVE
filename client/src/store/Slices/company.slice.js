import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    singleCompany: null,
    companies: [],
    searchCompanyByText: "",
}

export const authSlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setSearchCompanyByText: (state, action) => {
            state.searchCompanyByText = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { setCompanies, setSingleCompany, setSearchCompanyByText } = authSlice.actions;

export default authSlice.reducer;