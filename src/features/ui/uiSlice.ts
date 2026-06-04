import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type StatusFilter = 'todos' | 'alta_prioridade';
export type TaskSort = 'data' | 'prioridade';
export type TimelineView = 'timeline' | 'quadro' | 'lista';

export interface UiState {
  search: string;
  statusFilter: StatusFilter;
  taskSort: TaskSort;
  selectedTaskId: string | null;
  metadataOpen: boolean;
  newTaskModalOpen: boolean;
  timelineView: TimelineView;
  sidebarOpen: boolean;
}

const initialState: UiState = {
  search: '',
  statusFilter: 'todos',
  taskSort: 'data',
  selectedTaskId: null,
  metadataOpen: false,
  newTaskModalOpen: false,
  timelineView: 'timeline',
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setStatusFilter(state, action: PayloadAction<StatusFilter>) {
      state.statusFilter = action.payload;
    },
    setTaskSort(state, action: PayloadAction<TaskSort>) {
      state.taskSort = action.payload;
    },
    selectTask(state, action: PayloadAction<string | null>) {
      state.selectedTaskId = action.payload;
    },
    toggleMetadata(state, action: PayloadAction<boolean | undefined>) {
      state.metadataOpen = action.payload ?? !state.metadataOpen;
    },
    setNewTaskModal(state, action: PayloadAction<boolean>) {
      state.newTaskModalOpen = action.payload;
    },
    setTimelineView(state, action: PayloadAction<TimelineView>) {
      state.timelineView = action.payload;
    },
    toggleSidebar(state, action: PayloadAction<boolean | undefined>) {
      state.sidebarOpen = action.payload ?? !state.sidebarOpen;
    },
  },
});

export const {
  setSearch,
  setStatusFilter,
  setTaskSort,
  selectTask,
  toggleMetadata,
  setNewTaskModal,
  setTimelineView,
  toggleSidebar,
} = uiSlice.actions;

export default uiSlice.reducer;
