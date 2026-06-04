import { DAY } from './time';

/**
 * Configuração e dados simulados da tela de Analytics.
 *
 * Os KPIs "ao vivo" (total, taxa de sucesso, tempo médio, urgentes) são
 * DERIVADOS das tarefas mockadas — comportando-se como um backend que calcula
 * em cima dos dados reais. Já o histórico de longo prazo do heatmap e a linha
 * de meta do gráfico de tendência não existem nas tarefas, então vêm daqui.
 */

export const analyticsConfig = {
  /** Meta diária de conclusões (linha tracejada do gráfico de tendência). */
  dailyTarget: 3,
  /** Janela do gráfico de tendência, em dias. */
  trendDays: 14,
  /** Número de semanas exibidas no heatmap de execução. */
  heatmapWeeks: 17,
} as const;

/** KPIs de referência exibidos na vitrine do Figma (não derivados). */
export const mockShowcaseKpis = {
  totalSentences: 1284,
  successRate: 94.2,
  avgMinutes: 18,
  urgentPending: 4,
} as const;

/**
 * Baseline determinístico de atividade para o heatmap (preenche a grade de
 * forma orgânica, como no Figma). Sobre este baseline, o derive sobrepõe a
 * atividade real das tarefas. Determinístico por data → estável entre renders.
 */
export function mockHeatmapBaseline(
  weeks: number = analyticsConfig.heatmapWeeks,
  now: Date = new Date(),
): number[][] {
  const totalDays = weeks * 7;
  const start = new Date(now.getTime() - (totalDays - 1) * DAY);
  start.setHours(0, 0, 0, 0);

  const grid: number[][] = [];
  for (let w = 0; w < weeks; w += 1) {
    const col: number[] = [];
    for (let d = 0; d < 7; d += 1) {
      const ms = start.getTime() + (w * 7 + d) * DAY;
      // Ruído estável por data.
      const seed = (ms / DAY) % 7;
      const noise = seed < 1.4 ? 0 : seed < 3 ? 1 : seed < 5 ? 2 : 1;
      col.push(ms <= now.getTime() ? noise : 0);
    }
    grid.push(col);
  }
  return grid;
}
