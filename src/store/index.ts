import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import notesReducer from '@/features/notes/notesSlice';
import projectsReducer from '@/features/projects/projectsSlice';
import uiReducer from '@/features/ui/uiSlice';
import userReducer from '@/features/user/userSlice';
import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    notes: notesReducer,
    projects: projectsReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
