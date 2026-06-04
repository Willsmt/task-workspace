import styled from 'styled-components';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Card } from '@/components/ui/Card';
import { CompletionTrendsChart } from '@/features/analytics/CompletionTrendsChart';
import { PriorityMap } from '@/features/analytics/PriorityMap';
import { ExecutionHeatmap } from '@/features/analytics/ExecutionHeatmap';
import { StatusRatioDonut } from '@/features/analytics/StatusRatioDonut';
import { RecentTasksTable } from '@/features/analytics/RecentTasksTable';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  selectAnalyticsSummary,
  selectCompletionTrend,
  selectExecutionHeatmap,
  selectPriorityBreakdown,
  selectRecentTasks,
  selectStatusRatio,
} from '@/features/analytics/selectors';
import { theme } from '@/styles/theme';
import { formatDurationMinutes } from '@/utils/date';

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: 1fr;
  }
`;

const BottomCol = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.h2`
  font-size: 16px;
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const FullHeatmap = styled(Card)`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export function AnalyticsPage() {
  const summary = useAppSelector(selectAnalyticsSummary);
  const trend = useAppSelector(selectCompletionTrend);
  const breakdown = useAppSelector(selectPriorityBreakdown);
  const heatmap = useAppSelector(selectExecutionHeatmap);
  const ratio = useAppSelector(selectStatusRatio);
  const recent = useAppSelector(selectRecentTasks);

  return (
    <>
      <PageHeader
        title="Terminal de Analytics"
        subtitle="Fluxo de produtividade em tempo real e desempenho de execução."
      />

      <Stats>
        <StatCard
          label="Total de Tarefas"
          value={summary.total}
          footer={`${summary.completed} concluídas`}
          accent={theme.colors.inProgress}
        />
        <StatCard
          label="Taxa de Sucesso"
          value={`${summary.successRate}%`}
          footer="eficiência de conclusão"
          footerTone={theme.colors.completed}
          valueColor={theme.colors.completed}
          accent={theme.colors.completed}
        />
        <StatCard
          label="Tempo Médio"
          value={formatDurationMinutes(summary.avgMinutesToComplete)}
          footer="até a conclusão"
          accent={theme.colors.important}
        />
        <StatCard
          label="Urgentes Pendentes"
          value={String(summary.urgentPending).padStart(2, '0')}
          footer="requerem ação"
          footerTone={theme.colors.urgent}
          valueColor={theme.colors.urgent}
          accent={theme.colors.urgent}
        />
      </Stats>

      <TwoCol>
        <Card>
          <SectionTitle>Tendência de Conclusão</SectionTitle>
          <CompletionTrendsChart data={trend} />
        </Card>
        <Card>
          <SectionTitle>Mapa de Prioridades</SectionTitle>
          <PriorityMap data={breakdown} />
        </Card>
      </TwoCol>

      <FullHeatmap>
        <SectionTitle>Frequência de Execução</SectionTitle>
        <ExecutionHeatmap grid={heatmap} />
      </FullHeatmap>

      <BottomCol>
        <Card>
          <SectionTitle>Tarefas Recentes</SectionTitle>
          <RecentTasksTable tasks={recent} />
        </Card>
        <Card>
          <SectionTitle>Proporção de Status</SectionTitle>
          <StatusRatioDonut ratio={ratio} />
        </Card>
      </BottomCol>
    </>
  );
}
