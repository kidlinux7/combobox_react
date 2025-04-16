import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all donors
export const fetchDonors = createAsyncThunk("donors/fetchDonors", async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/donors");
    return response.data;
});

export const addDonors = createAsyncThunk("donors/addDonor", async (formData) => {
    const response = await axios.post("http://127.0.0.1:8000/api/donors", formData);
    return response.data;
});

export const updateDonors = createAsyncThunk("donors/updateDonor", async (formData) => {
    const response = await axios.put("http://127.0.0.1:8000/api/donors", formData);
    return response.data;
});

export const deleteDonors = createAsyncThunk("donors/deleteDonor", async (formData) => {
    const response = await axios.delete("http://127.0.0.1:8000/api/donors", {
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
