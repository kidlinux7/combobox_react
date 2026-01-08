import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchVolunteers = createAsyncThunk("volunteers/fetchVolunteers", async () => {
    const response = await axios.get(`${API_BASE_URL}/volunteers`);
    return response.data;
});

export const addVolunteer = createAsyncThunk("volunteers/addVolunteer", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/volunteers`, formData);
    return response.data;
});

export const updateVolunteer = createAsyncThunk("volunteers/updateVolunteer", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/volunteers`, formData);
    return response.data;
});

export const deleteVolunteer = createAsyncThunk("volunteers/deleteVolunteer", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/volunteers`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const VolunteerSlice = createSlice({
    name: "volunteer",
    initialState: {
        volunteers: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVolunteers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchVolunteers.fulfilled, (state, action) => {
                state.volunteers = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchVolunteers.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(addVolunteer.fulfilled, (state, action) => {
                state.volunteers.push(action.payload);
            })
            .addCase(updateVolunteer.fulfilled, (state, action) => {
                const updateVolunteer = action.payload;
                const index = state.volunteers.findIndex((volunteer) => volunteer.id === updateVolunteer.id);
                if (index !== -1) {
                    state.volunteers[index] = updateVolunteer;
                }
            })
            .addCase(deleteVolunteer.fulfilled, (state, action) => {
                state.volunteers = state.volunteers.filter((volunteer) => volunteer.id !== action.payload);
            });
    },
});

export default VolunteerSlice.reducer;
