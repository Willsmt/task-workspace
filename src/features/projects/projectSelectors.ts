import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import type { Priority } from '@/types/domain';

const selectProjects = (state: RootState) => state.projects.items;
const selectTasks = (state: RootState) => state.tasks.items;

/** Contagem de tarefas ativas por prioridade (para o filtro lateral). */
export const selectPriorityCounts = createSelector([selectTasks], (tasks) => {
  const counts: Record<Priority, number> = { urgente: 0, importante: 0, normal: 0 };
  for (const t of tasks) {
    if (t.status !== 'concluida') counts[t.priority] += 1;
  }
  return counts;
});

/** Progresso geral médio dos projetos. */
export const selectOverallProgress = createSelector([selectProjects], (projects) => {
  if (projects.length === 0) return 0;
  const sum = projects.reduce((acc, p) => acc + p.progress, 0);
  return Math.round(sum / projects.length);
});

export interface ProjectWithStats {
  id: string;
  name: string;
  priority: Priority;
  progress: number;
  startDate: string;
  endDate: string;
  taskCount: number;
}

/** Projetos enriquecidos com a contagem de tarefas vinculadas. */
export const selectProjectsWithStats = createSelector(
  [selectProjects, selectTasks],
  (projects, tasks): ProjectWithStats[] =>
    projects.map((p) => ({
      ...p,
      taskCount: tasks.filter((t) => t.projectId === p.id).length,
    })),
);
