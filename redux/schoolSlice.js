import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Schools
export const fetchSchools = createAsyncThunk("schools/fetchSchools", async () => {
    const response = await axios.get(`${API_BASE_URL}/schools`);
    return response.data;
});

export const addSchool = createAsyncThunk("schools/addSchool", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/schools`, formData);
    return response.data;
});

export const updateSchool = createAsyncThunk("schools/updateSchool", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/schools`, formData);
    return response.data;
});

export const deleteSchool = createAsyncThunk("schools/deleteSchool", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/schools`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const SchoolSlice = createSlice({
    name: "school",
    initialState: {
        schools: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchools.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSchools.fulfilled, (state, action) => {
                state.schools = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchSchools.rejected, (state) => {
                state.status = "failed";
            })
            
            .addCase(addSchool.fulfilled, (state, action) => {
                state.schools.push(action.payload);
            })
            .addCase(updateSchool.fulfilled, (state, action) => {
                const updateSchool = action.payload;
                const index = state.schools.findIndex((school) => school.id === updateSchool.id);
                if (index !== -1) {
                    state.schools[index] = updateSchool;
                }
            })
            .addCase(deleteSchool.fulfilled, (state, action) => {
                state.schools = state.schools.filter((school) => school.id !== action.payload);
            });
    },
});

export default SchoolSlice.reducer;
