import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatCard } from '@/components/ui/StatCard';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { Panel } from '@/components/ui/Card';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { TaskTable } from '@/features/tasks/TaskTable';
import { NewTaskForm } from '@/features/tasks/NewTaskForm';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  selectDashboardTasks,
  selectNextDeadlineTask,
  selectTaskCounts,
} from '@/features/tasks/selectors';
import { setStatusFilter, setTaskSort } from '@/features/ui/uiSlice';
import { theme } from '@/styles/theme';
import { glass, monoLabel } from '@/styles/mixins';

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.space.sm};
  margin-bottom: ${({ theme }) => theme.space.lg};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: ${({ theme }) => theme.space.md};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoint.desktop - 1}px) {
    grid-template-columns: 1fr;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;

  h2 {
    font-size: 17px;
    font-weight: 600;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Foot = styled(Link)`
  display: block;
  padding: 14px ${({ theme }) => theme.space.md};
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  border-top: 1px solid ${({ theme }) => theme.colors.borderFaint};
  transition: color ${({ theme }) => theme.transition.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const SidePanel = styled.div`
  ${glass};
  padding: ${({ theme }) => theme.space.md};

  h2 {
    font-size: 16px;
    margin-bottom: 4px;
  }
  & > p {
    ${monoLabel};
    margin-bottom: ${({ theme }) => theme.space.sm};
  }
`;

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const counts = useAppSelector(selectTaskCounts);
  const tasks = useAppSelector(selectDashboardTasks);
  const nextDeadline = useAppSelector(selectNextDeadlineTask);
  const statusFilter = useAppSelector((s) => s.ui.statusFilter);
  const taskSort = useAppSelector((s) => s.ui.taskSort);

  return (
    <>
      <PageHeader
        title="Painel de Controle"
        subtitle="Visão geral das tarefas críticas e contagens regressivas ativas."
      />

      <Stats>
        <StatCard
          label="Tarefas Ativas"
          value={String(counts.active).padStart(2, '0')}
          footer="em andamento"
          accent={theme.colors.inProgress}
        />
        <StatCard
          label="Vencem Hoje"
          value={String(counts.dueToday).padStart(2, '0')}
          footer="requerem atenção"
          footerTone={theme.colors.important}
          accent={theme.colors.important}
        />
        <StatCard
          label="Concluídas"
          value={String(counts.completed).padStart(2, '0')}
          footer="finalizadas"
          footerTone={theme.colors.completed}
          accent={theme.colors.completed}
        />
        <StatCard
          label="Próximo Prazo Crítico"
          value={<CountdownTimer target={nextDeadline?.dueDate ?? null} />}
          footer={nextDeadline ? nextDeadline.title : 'Sem prazos urgentes'}
          accent={theme.colors.primary}
        />
      </Stats>

      <Grid>
        <Panel>
          <SectionHead>
            <h2>Tarefas Ativas</h2>
            <Controls>
              <SegmentedControl
                ariaLabel="Filtro de status"
                value={statusFilter}
                onChange={(v) => dispatch(setStatusFilter(v))}
                options={[
                  { value: 'todos', label: 'Todos' },
                  { value: 'alta_prioridade', label: 'Alta Prioridade' },
                ]}
              />
              <SegmentedControl
                ariaLabel="Ordenação"
                value={taskSort}
                onChange={(v) => dispatch(setTaskSort(v))}
                options={[
                  { value: 'data', label: 'Por Data' },
                  { value: 'prioridade', label: 'Por Prioridade' },
                ]}
              />
            </Controls>
          </SectionHead>

          <TaskTable tasks={tasks.slice(0, 6)} />

          <Foot to="/tarefas">Ver todas as {counts.active} tarefas ativas →</Foot>
        </Panel>

        <SidePanel>
          <h2>Nova Tarefa</h2>
          <p>Registre uma nova entrada</p>
          <NewTaskForm />
        </SidePanel>
      </Grid>
    </>
  );
}
