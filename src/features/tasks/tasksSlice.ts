import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Priority, Status, Task } from '@/types/domain';
import { createId } from '@/utils/id';

export interface TasksState {
  items: Task[];
}

const initialState: TasksState = { items: [] };

export interface NewTaskInput {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null;
  projectId?: string | null;
  parentId?: string | null;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.items = action.payload;
    },
    addTask: {
      reducer(state, action: PayloadAction<Task>) {
        state.items.unshift(action.payload);
      },
      prepare(input: NewTaskInput) {
        const now = new Date().toISOString();
        const task: Task = {
          id: createId('task'),
          title: input.title.trim(),
          description: input.description.trim(),
          priority: input.priority,
          status: 'pendente',
          dueDate: input.dueDate,
          projectId: input.projectId ?? null,
          noteId: null,
          parentId: input.parentId ?? null,
          createdAt: now,
          completedAt: null,
        };
        return { payload: task };
      },
    },
    updateTask(state, action: PayloadAction<{ id: string; changes: Partial<Task> }>) {
      const task = state.items.find((it) => it.id === action.payload.id);
      if (task) Object.assign(task, action.payload.changes);
    },
    setStatus(state, action: PayloadAction<{ id: string; status: Status }>) {
      const task = state.items.find((it) => it.id === action.payload.id);
      if (!task) return;
      task.status = action.payload.status;
      task.completedAt = action.payload.status === 'concluida' ? new Date().toISOString() : null;
    },
    toggleComplete(state, action: PayloadAction<string>) {
      const task = state.items.find((it) => it.id === action.payload);
      if (!task) return;
      const done = task.status === 'concluida';
      task.status = done ? 'pendente' : 'concluida';
      task.completedAt = done ? null : new Date().toISOString();
    },
    setPriority(state, action: PayloadAction<{ id: string; priority: Priority }>) {
      const task = state.items.find((it) => it.id === action.payload.id);
      if (task) task.priority = action.payload.priority;
    },
    linkNote(state, action: PayloadAction<{ taskId: string; noteId: string }>) {
      const task = state.items.find((it) => it.id === action.payload.taskId);
      if (task) task.noteId = action.payload.noteId;
    },
    removeTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (it) => it.id !== action.payload && it.parentId !== action.payload,
      );
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  setStatus,
  toggleComplete,
  setPriority,
  linkNote,
  removeTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
