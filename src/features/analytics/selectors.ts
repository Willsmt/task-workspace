import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import {
  completionTrend,
  executionHeatmap,
  priorityBreakdown,
  statusRatio,
  summarize,
} from '@/utils/derive';
import { analyticsConfig, mockHeatmapBaseline } from '@/mocks/analytics';

const selectTasks = (state: RootState) => state.tasks.items;

// Baseline histórico do heatmap (mock) calculado uma vez por sessão.
const heatmapBaseline = mockHeatmapBaseline();

export const selectAnalyticsSummary = createSelector([selectTasks], summarize);
export const selectPriorityBreakdown = createSelector([selectTasks], priorityBreakdown);
export const selectStatusRatio = createSelector([selectTasks], statusRatio);
export const selectCompletionTrend = createSelector([selectTasks], (t) =>
  completionTrend(t, analyticsConfig.trendDays, analyticsConfig.dailyTarget),
);
export const selectExecutionHeatmap = createSelector([selectTasks], (t) =>
  executionHeatmap(t, heatmapBaseline),
);

/** Tarefas ordenadas pela atualização mais recente (concluída ou criada). */
export const selectRecentTasks = createSelector([selectTasks], (tasks) =>
  [...tasks]
    .sort((a, b) => {
      const ta = new Date(a.completedAt ?? a.createdAt).getTime();
      const tb = new Date(b.completedAt ?? b.createdAt).getTime();
      return tb - ta;
    })
    .slice(0, 5),
);
