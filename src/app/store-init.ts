import { store } from '@/store';
import { loadState } from '@/services/persistence';
import { buildMockState, mockCurrentUser } from '@/mocks';
import { setTasks } from '@/features/tasks/tasksSlice';
import { setNotes } from '@/features/notes/notesSlice';
import { setProjects } from '@/features/projects/projectsSlice';
import { setCurrentUser } from '@/features/user/userSlice';

/**
 * Hidrata o store antes de montar a árvore React:
 * - dados de domínio: localStorage se existir, senão os mocks iniciais;
 * - usuário autenticado: sempre do mock (login simulado, sem backend).
 */
export function initStore(): void {
  const persisted = loadState();
  const data = persisted ?? buildMockState();
  store.dispatch(setTasks(data.tasks));
  store.dispatch(setNotes(data.notes));
  store.dispatch(setProjects(data.projects));
  store.dispatch(setCurrentUser(mockCurrentUser));
}
