import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchAmbassadors = createAsyncThunk("ambassadors/fetchAmbassadors", async () => {
    const response = await axios.get(`${API_BASE_URL}/ambassadors`);
    return response.data;
});

export const addAmbassador = createAsyncThunk("ambassadors/addAmbassador", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/ambassadors`, formData);
    return response.data;
});

export const updateAmbassador = createAsyncThunk("ambassadors/updateAmbassador", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/ambassadors`, formData);
    return response.data;
});

export const deleteAmbassador = createAsyncThunk("ambassadors/deleteAmbassador", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/ambassadors`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const AmbassadorSlice = createSlice({
    name: "ambassador",
    initialState: {
        ambassadors: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAmbassadors.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAmbassadors.fulfilled, (state, action) => {
                state.ambassadors = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchAmbassadors.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(addAmbassador.fulfilled, (state, action) => {
                state.ambassadors.push(action.payload);
            })
            .addCase(updateAmbassador.fulfilled, (state, action) => {
                const updateAmbassador = action.payload;
                const index = state.ambassadors.findIndex((ambassador) => ambassador.id === updateAmbassador.id);
                if (index !== -1) {
                    state.ambassadors[index] = updateAmbassador;
                }
            })
            .addCase(deleteAmbassador.fulfilled, (state, action) => {
                state.ambassadors = state.ambassadors.filter((ambassador) => ambassador.id !== action.payload);
            });
    },
});

export default AmbassadorSlice.reducer;
