import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { saveState } from '@/services/persistence';
import type { RootState } from './index';
import * as tasks from '@/features/tasks/tasksSlice';
import * as notes from '@/features/notes/notesSlice';
import { setProjects } from '@/features/projects/projectsSlice';

export const listenerMiddleware = createListenerMiddleware();

let timer: ReturnType<typeof setTimeout> | null = null;

/** Persiste o estado de domínio com debounce após qualquer mutação relevante. */
listenerMiddleware.startListening({
  matcher: isAnyOf(
    tasks.setTasks,
    tasks.addTask,
    tasks.updateTask,
    tasks.setStatus,
    tasks.toggleComplete,
    tasks.setPriority,
    tasks.linkNote,
    tasks.removeTask,
    notes.setNotes,
    notes.upsertNote,
    notes.updateNoteContent,
    notes.updateNoteTitle,
    notes.setNoteTags,
    setProjects,
  ),
  effect: (_action, api) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      const state = api.getState() as RootState;
      saveState({
        tasks: state.tasks.items,
        notes: state.notes.items,
        projects: state.projects.items,
      });
    }, 250);
  },
});
