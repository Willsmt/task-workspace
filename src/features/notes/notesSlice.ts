import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Note } from '@/types/domain';
import { createId } from '@/utils/id';

export interface NotesState {
  items: Note[];
}

const initialState: NotesState = { items: [] };

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.items = action.payload;
    },
    upsertNote: {
      reducer(state, action: PayloadAction<Note>) {
        const idx = state.items.findIndex((n) => n.id === action.payload.id);
        if (idx >= 0) state.items[idx] = action.payload;
        else state.items.unshift(action.payload);
      },
      prepare(input: { taskId?: string | null; title?: string }) {
        const note: Note = {
          id: createId('note'),
          taskId: input.taskId ?? null,
          title: input.title ?? 'Nova nota',
          content: '',
          updatedAt: new Date().toISOString(),
          tags: [],
        };
        return { payload: note };
      },
    },
    updateNoteContent(state, action: PayloadAction<{ id: string; content: string }>) {
      const note = state.items.find((n) => n.id === action.payload.id);
      if (note) {
        note.content = action.payload.content;
        note.updatedAt = new Date().toISOString();
      }
    },
    updateNoteTitle(state, action: PayloadAction<{ id: string; title: string }>) {
      const note = state.items.find((n) => n.id === action.payload.id);
      if (note) {
        note.title = action.payload.title;
        note.updatedAt = new Date().toISOString();
      }
    },
    setNoteTags(state, action: PayloadAction<{ id: string; tags: string[] }>) {
      const note = state.items.find((n) => n.id === action.payload.id);
      if (note) {
        note.tags = action.payload.tags;
        note.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { setNotes, upsertNote, updateNoteContent, updateNoteTitle, setNoteTags } =
  notesSlice.actions;

export default notesSlice.reducer;
