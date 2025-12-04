import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchTeachers = createAsyncThunk("teachers/fetchTeachers", async () => {
    const response = await axios.get(`${API_BASE_URL}/teachers`);
    return response.data;
});

export const addTeacher = createAsyncThunk("teachers/addTeacher", async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/teachers`, formData);
    return response.data;
});

export const updateTeacher = createAsyncThunk("teachers/updateTeacher", async (formData) => {
    const response = await axios.put(`${API_BASE_URL}/teachers`, formData);
    return response.data;
});

export const deleteTeacher = createAsyncThunk("teachers/deleteTeacher", async (formData) => {
    const response = await axios.delete(`${API_BASE_URL}/teachers`, {
        data: formData, // 👈 wrap formData here
    });
    return response.data;
});


const TeacherSlice = createSlice({
    name: "teacher",
    initialState: {
        teachers: [],
        status: "idle",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                state.teachers = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchTeachers.rejected, (state) => {
                state.status = "failed";
            })
            
            .addCase(addTeacher.fulfilled, (state, action) => {
                state.teachers.push(action.payload);
            })
            .addCase(updateTeacher.fulfilled, (state, action) => {
                const updateTeacher = action.payload;
                const index = state.teachers.findIndex((teacher) => teacher.id === updateTeacher.id);
                if (index !== -1) {
                    state.teachers[index] = updateTeacher;
                }
            })
            .addCase(deleteTeacher.fulfilled, (state, action) => {
                state.teachers = state.teachers.filter((teacher) => teacher.id !== action.payload);
            });
    },
});

export default TeacherSlice.reducer;
