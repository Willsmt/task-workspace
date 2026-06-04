import type { Priority, Task } from '@/types/domain';

/** Cálculos derivados para a tela de Analytics (sem estado próprio). */

export interface AnalyticsSummary {
  total: number;
  completed: number;
  successRate: number; // 0–100
  avgMinutesToComplete: number;
  urgentPending: number;
}

export function summarize(tasks: Task[]): AnalyticsSummary {
  const total = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'concluida');
  const completed = completedTasks.length;
  const successRate = total === 0 ? 0 : Math.round((completed / total) * 1000) / 10;

  const durations = completedTasks
    .filter((t) => t.completedAt)
    .map((t) => new Date(t.completedAt as string).getTime() - new Date(t.createdAt).getTime())
    .filter((ms) => ms > 0);
  const avgMs =
    durations.length === 0 ? 0 : durations.reduce((a, b) => a + b, 0) / durations.length;
  const avgMinutesToComplete = Math.round(avgMs / 60000);

  const urgentPending = tasks.filter(
    (t) => t.status !== 'concluida' && t.priority === 'urgente',
  ).length;

  return { total, completed, successRate, avgMinutesToComplete, urgentPending };
}

export interface PriorityBreakdown {
  priority: Priority;
  count: number;
  ratio: number; // 0–1 relativo ao maior grupo
}

export function priorityBreakdown(tasks: Task[]): PriorityBreakdown[] {
  const counts: Record<Priority, number> = { urgente: 0, importante: 0, normal: 0 };
  for (const t of tasks) counts[t.priority] += 1;
  const max = Math.max(1, ...Object.values(counts));
  return (['urgente', 'importante', 'normal'] as Priority[]).map((priority) => ({
    priority,
    count: counts[priority],
    ratio: counts[priority] / max,
  }));
}

export interface StatusRatio {
  concluida: number;
  em_progresso: number;
  pendente: number;
  completedPct: number; // 0–100
}

export function statusRatio(tasks: Task[]): StatusRatio {
  const r = { concluida: 0, em_progresso: 0, pendente: 0 };
  for (const t of tasks) r[t.status] += 1;
  const total = Math.max(1, tasks.length);
  return { ...r, completedPct: Math.round((r.concluida / total) * 100) };
}

/**
 * Série temporal de conclusões nos últimos `days` dias (para o gráfico de tendências).
 * Cada ponto: { label, completed, target }.
 */
export interface TrendPoint {
  label: string;
  completed: number;
  target: number;
}

export function completionTrend(
  tasks: Task[],
  days: number,
  dailyTarget: number,
  now: Date = new Date(),
): TrendPoint[] {
  const points: TrendPoint[] = [];
  const dayMs = 86400000;
  for (let i = days - 1; i >= 0; i -= 1) {
    const dayStart = new Date(now.getTime() - i * dayMs);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = dayStart.getTime() + dayMs;
    const completed = tasks.filter((t) => {
      if (!t.completedAt) return false;
      const c = new Date(t.completedAt).getTime();
      return c >= dayStart.getTime() && c < dayEnd;
    }).length;
    points.push({
      label: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit' }).format(
        dayStart,
      ),
      completed,
      target: dailyTarget,
    });
  }
  return points;
}

/**
 * Heatmap estilo GitHub: intensidade 0–4 por dia.
 * Sobrepõe a atividade real das tarefas (createdAt/completedAt) sobre o
 * baseline histórico mockado (mesma forma de grade `weeks x 7`).
 */
export function executionHeatmap(
  tasks: Task[],
  baseline: number[][],
  now: Date = new Date(),
): number[][] {
  const dayMs = 86400000;
  const weeks = baseline.length;
  const totalDays = weeks * 7;
  const start = new Date(now.getTime() - (totalDays - 1) * dayMs);
  start.setHours(0, 0, 0, 0);

  const keyFor = (ms: number) => {
    const d = new Date(ms);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  };

  const byDay = new Map<string, number>();
  const bump = (iso: string | null, amount: number) => {
    if (!iso) return;
    const key = keyFor(new Date(iso).getTime());
    byDay.set(key, (byDay.get(key) ?? 0) + amount);
  };
  for (const t of tasks) {
    bump(t.createdAt, 1);
    bump(t.completedAt, 2);
  }

  return baseline.map((week, w) =>
    week.map((base, d) => {
      const ms = start.getTime() + (w * 7 + d) * dayMs;
      const real = byDay.get(keyFor(ms)) ?? 0;
      return Math.min(4, base + real);
    }),
  );
}
