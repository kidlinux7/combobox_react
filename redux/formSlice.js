import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch all projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`);
  return response.data;
});

// ✅ Create a new project
export const createProject = createAsyncThunk("createProject", async (formData) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, formData);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

// ✅ Export both thunks so you can import them
// export { fetchProjects, createForm };

export default projectSlice.reducer;
