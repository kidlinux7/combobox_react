import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Univerisities
export const fetchCenters = createAsyncThunk("centers/fetchCenters", async () => {
    const response = await axios.get(`${API_BASE_URL}/centers`);
    return response.data;
});

export const addCenters = createAsyncThunk("centers/addCenters", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/centers`, formData);
    return response.data;
});

export const updateCenters = createAsyncThunk("centers/updateCenters", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/centers`, formData);
    return response.data;
});

export const deleteCenters = createAsyncThunk("centers/deleteCenters", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/centers`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const CentersSlice = createSlice({
    name: "center",
    initialState: {
        centers: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCenters.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCenters.fulfilled, (state, action) => {
                state.centers = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchCenters.rejected, (state) => {
                state.status = "failed";
            })
            
            .addCase(addCenters.fulfilled, (state, action) => {
                state.centers.push(action.payload);
            })
            .addCase(updateCenters.fulfilled, (state, action) => {
                const updateCenters = action.payload;
                const index = state.centers.findIndex((center) => center.id === updateCenters.id);
                if (index !== -1) {
                    state.centers[index] = updateCenters;
                }
            })
            .addCase(deleteCenters.fulfilled, (state, action) => {
                state.centers = state.centers.filter((center) => center.id !== action.payload);
            });
    },
});

export default CentersSlice.reducer;
