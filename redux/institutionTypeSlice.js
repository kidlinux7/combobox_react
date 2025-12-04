import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Institution Types
export const fetchInstitutionTypes = createAsyncThunk("institutionType/fetchInstitutionType", async () => {
    const response = await axios.get(`${API_BASE_URL}/institutions`);
    return response.data;
});


const InstitutionTypeSlice = createSlice({
    name: "institutionType",
    initialState: {
        institutionTypes: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInstitutionTypes.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInstitutionTypes.fulfilled, (state, action) => {
                state.institutionTypes = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchInstitutionTypes.rejected, (state) => {
                state.status = "failed";
            })
            
    },
});

export default InstitutionTypeSlice.reducer;
