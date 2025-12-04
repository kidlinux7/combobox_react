import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all donors
export const fetchDonors = createAsyncThunk("donors/fetchDonors", async () => {
    const response = await axios.get(`${API_BASE_URL}/donors`);
    return response.data;
});

export const addDonors = createAsyncThunk("donors/addDonor", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/donors`, formData);
    return response.data;
});

export const updateDonors = createAsyncThunk("donors/updateDonor", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/donors`, formData);
    return response.data;
});

export const deleteDonors = createAsyncThunk("donors/deleteDonor", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/donors`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const donorSlice = createSlice({
    name: "donor",
    initialState: {
        donors: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDonors.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDonors.fulfilled, (state, action) => {
                state.donors = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchDonors.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(addDonors.fulfilled, (state, action) => {
                state.donors.push(action.payload);
            })
            .addCase(updateDonors.fulfilled, (state, action) => {
                const updatedDonor = action.payload;
                const index = state.donors.findIndex((donor) => donor.id === updatedDonor.id);
                if (index !== -1) {
                    state.donors[index] = updatedDonor;
                }
            })
            .addCase(deleteDonors.fulfilled, (state, action) => {
                state.donors = state.donors.filter((donor) => donor.id !== action.payload);
            });
    },
});

export default donorSlice.reducer;
