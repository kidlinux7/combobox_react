import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Nationalities
export const fetchNationalities = createAsyncThunk("nationalities/fetchNationalities", async () => {
    const response = await axios.get(`${API_BASE_URL}/nationalities`);
    return response.data;
});

const NationalitySlice = createSlice({
    name: "nationality",
    initialState: {
        nationalities: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNationalities.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNationalities.fulfilled, (state, action) => {
                state.nationalities = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchNationalities.rejected, (state) => {
                state.status = "failed";
            })
            
    },
});

export default NationalitySlice.reducer;
