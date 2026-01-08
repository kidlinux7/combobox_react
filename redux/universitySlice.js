import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all Univerisities
export const fetchUniversities = createAsyncThunk("universities/fetchUniversities", async () => {
    const response = await axios.get(`${API_BASE_URL}/universities`);
    return response.data;
});

export const addUniversities = createAsyncThunk("universities/addUniversities", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/universities`, formData);
    return response.data;
});

export const updateUniversities = createAsyncThunk("universities/updateUniversities", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/universities`, formData);
    return response.data;
});

export const deleteUniversities = createAsyncThunk("universities/deleteUniversities", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/universities`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const UniversitiesSlice = createSlice({
    name: "university",
    initialState: {
        universities: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUniversities.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUniversities.fulfilled, (state, action) => {
                state.universities = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchUniversities.rejected, (state) => {
                state.status = "failed";
            })
            
            .addCase(addUniversities.fulfilled, (state, action) => {
                state.universities.push(action.payload);
            })
            .addCase(updateUniversities.fulfilled, (state, action) => {
                const updateUniversities = action.payload;
                const index = state.universities.findIndex((university) => university.id === updateUniversities.id);
                if (index !== -1) {
                    state.universities[index] = updateUniversities;
                }
            })
            .addCase(deleteUniversities.fulfilled, (state, action) => {
                state.universities = state.universities.filter((university) => university.id !== action.payload);
            });
    },
});

export default UniversitiesSlice.reducer;
