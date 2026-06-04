import type { Note, Project, Task } from '@/types/domain';
import { createIso } from './time';
import { mockTasks } from './tasks';
import { mockNotes } from './notes';
import { mockProjects } from './projects';

export interface MockState {
  tasks: Task[];
  notes: Note[];
  projects: Project[];
}

/**
 * Estado inicial composto a partir de todos os mocks de domínio.
 * Usado quando não há nada persistido no localStorage.
 */
export function buildMockState(now: Date = new Date()): MockState {
  const iso = createIso(now);
  return {
    tasks: mockTasks(iso),
    notes: mockNotes(iso),
    projects: mockProjects(iso),
  };
}

export { mockCurrentUser, mockUsers } from './users';
export { analyticsConfig, mockHeatmapBaseline, mockShowcaseKpis } from './analytics';
