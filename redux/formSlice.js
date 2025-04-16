import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get("http://127.0.0.1:8000/api/projects");
  return response.data;
});

// ✅ Create a new project
export const createProject = createAsyncThunk("createProject", async (formData) => {
  const response = await axios.post("http://127.0.0.1:8000/api/projects", formData);
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
