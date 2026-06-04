import type { Note, Project, Task } from '@/types/domain';

const STORAGE_KEY = 'tasknote:v1';

/** Apenas os dados de domínio são persistidos (UI fica em memória). */
export interface PersistedState {
  tasks: Task[];
  notes: Note[];
  projects: Project[];
}

export function loadState(): PersistedState | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!parsed.tasks || !parsed.notes || !parsed.projects) return undefined;
    return { tasks: parsed.tasks, notes: parsed.notes, projects: parsed.projects };
  } catch {
    return undefined;
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* armazenamento indisponível — ignora silenciosamente */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
