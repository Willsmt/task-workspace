import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { PRIORITY_ORDER, type Task } from '@/types/domain';
import { daysUntil } from '@/utils/date';

export const selectAllTasks = (state: RootState): Task[] => state.tasks.items;
export const selectSearch = (state: RootState): string => state.ui.search;
export const selectStatusFilter = (state: RootState) => state.ui.statusFilter;
export const selectTaskSort = (state: RootState) => state.ui.taskSort;

/** Tarefas raiz (sem mãe). */
export const selectRootTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((t) => t.parentId === null),
);

/** Subtarefas indexadas por id da mãe. */
export const selectSubtasksByParent = createSelector([selectAllTasks], (tasks) => {
  const map: Record<string, Task[]> = {};
  for (const t of tasks) {
    if (t.parentId) (map[t.parentId] ??= []).push(t);
  }
  return map;
});

const matchesSearch = (t: Task, q: string): boolean => {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    t.title.toLowerCase().includes(needle) || t.description.toLowerCase().includes(needle)
  );
};

/** Tarefas ativas (não concluídas) já filtradas/ordenadas para o Dashboard. */
export const selectDashboardTasks = createSelector(
  [selectAllTasks, selectSearch, selectStatusFilter, selectTaskSort],
  (tasks, search, statusFilter, sort) => {
    let list = tasks.filter((t) => t.status !== 'concluida' && matchesSearch(t, search));
    if (statusFilter === 'alta_prioridade') {
      list = list.filter((t) => t.priority === 'urgente' || t.priority === 'importante');
    }
    const sorted = [...list].sort((a, b) => {
      if (sort === 'prioridade') {
        return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      }
      const da = a.dueDate ? new Date(a.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const db = b.dueDate ? new Date(b.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return da - db;
    });
    return sorted;
  },
);

/** A tarefa não concluída com o prazo válido mais próximo (para o countdown). */
export const selectNextDeadlineTask = createSelector([selectAllTasks], (tasks) => {
  const upcoming = tasks
    .filter((t) => t.status !== 'concluida' && t.dueDate)
    .filter((t) => new Date(t.dueDate as string).getTime() > Date.now())
    .sort(
      (a, b) =>
        new Date(a.dueDate as string).getTime() - new Date(b.dueDate as string).getTime(),
    );
  return upcoming[0] ?? null;
});

export interface TaskCounts {
  total: number;
  active: number;
  dueToday: number;
  completed: number;
  urgentPending: number;
}

export const selectTaskCounts = createSelector([selectAllTasks], (tasks): TaskCounts => {
  let active = 0;
  let dueToday = 0;
  let completed = 0;
  let urgentPending = 0;
  for (const t of tasks) {
    if (t.status === 'concluida') completed += 1;
    else active += 1;
    if (t.status !== 'concluida' && daysUntil(t.dueDate) === 0) dueToday += 1;
    if (t.status !== 'concluida' && t.priority === 'urgente') urgentPending += 1;
  }
  return { total: tasks.length, active, dueToday, completed, urgentPending };
});

export const selectTaskById = (id: string | null) =>
  createSelector([selectAllTasks], (tasks) => tasks.find((t) => t.id === id) ?? null);
