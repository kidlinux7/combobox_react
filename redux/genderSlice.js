import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Genders
export const fetchGenders = createAsyncThunk("genders/fetchGenders", async () => {
    const response = await axios.get(`${API_BASE_URL}/genders`);
    return response.data;
});


const GenderSlice = createSlice({
    name: "gender",
    initialState: {
        genders: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenders.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGenders.fulfilled, (state, action) => {
                state.genders = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchGenders.rejected, (state) => {
                state.status = "failed";
            })
            
    },
});

export default GenderSlice.reducer;
