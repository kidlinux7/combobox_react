import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Education Level
export const fetchEducationLevel = createAsyncThunk("education_level/fetchEducationLevel", async () => {
    const response = await axios.get(`${API_BASE_URL}/education_level`);
    return response.data;
});

const EducationLevelSlice = createSlice({
    name: "educationLevel",
    initialState: {
        educationLevels: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEducationLevel.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchEducationLevel.fulfilled, (state, action) => {
                state.educationLevels = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchEducationLevel.rejected, (state) => {
                state.status = "failed";
            })
            
    },
});

export default EducationLevelSlice.reducer;
