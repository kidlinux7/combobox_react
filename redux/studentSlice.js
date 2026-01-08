import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStudents = createAsyncThunk("students/fetchStudents", async (query = "") => {
    const response = await axios.get(`${API_BASE_URL}/students/${query}`);
    return response.data;
});

export const addStudent = createAsyncThunk("students/addStudent", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/students/""`, formData);
    return response.data;
});

export const updateStudent = createAsyncThunk("students/updateStudent", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/students/""`, formData);
    return response.data;
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/students/""`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const StudentSlice = createSlice({
    name: "student",
    initialState: {
        students: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudents.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.students = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchStudents.rejected, (state) => {
                state.status = "failed";
            })

            .addCase(addStudent.fulfilled, (state, action) => {
                state.students.push(action.payload);
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                const updateStudent = action.payload;
                const index = state.students.findIndex((student) => student.id === updateStudent.id);
                if (index !== -1) {
                    state.students[index] = updateStudent;
                }
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.students = state.students.filter((student) => student.id !== action.payload);
            });
    },
});

export default StudentSlice.reducer;
