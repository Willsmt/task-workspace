import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@/types/domain';

export interface ProjectsState {
  items: Project[];
}

const initialState: ProjectsState = { items: [] };

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects(state, action: PayloadAction<Project[]>) {
      state.items = action.payload;
    },
  },
});

export const { setProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
