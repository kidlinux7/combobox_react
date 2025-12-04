import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Regions
export const fetchRegions = createAsyncThunk("regions/fetchRegions", async () => {
    const response = await axios.get(`${API_BASE_URL}/regions`);
    return response.data;
});

const RegionSlice = createSlice({
    name: "region",
    initialState: {
        regions: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRegions.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRegions.fulfilled, (state, action) => {
                state.regions = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchRegions.rejected, (state) => {
                state.status = "failed";
            })
            
    },
});

export default RegionSlice.reducer;
