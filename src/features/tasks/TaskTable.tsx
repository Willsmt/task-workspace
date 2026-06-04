import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import type { Task } from '@/types/domain';
import { PriorityBadge, StatusBadge } from './badges';
import { Checkbox } from '@/components/ui/Checkbox';
import { CountdownInline } from './CountdownInline';
import { formatDeadline, daysUntil } from '@/utils/date';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleComplete } from './tasksSlice';
import { selectTask } from '@/features/ui/uiSlice';

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px 150px;
  gap: ${({ theme }) => theme.space.sm};
  padding: 10px ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 10.5px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    display: none;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 150px 150px;
  gap: ${({ theme }) => theme.space.sm};
  align-items: center;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderFaint};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition.fast};

  &:hover {
    background: ${({ theme }) => theme.tint.neutralBg};
  }
  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: 1fr auto;
    grid-row-gap: 10px;
  }
`;

const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;

  div {
    min-width: 0;
  }
  strong {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.onSurface};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Cell = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-column: 1 / -1;
    gap: 8px;
  }
`;

const Deadline = styled.div<{ $urgent: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13px;
  color: ${({ theme, $urgent }) => ($urgent ? theme.colors.primary : theme.colors.onSurfaceVariant)};
`;

const Empty = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.onSurfaceFaint};
  font-size: 14px;
`;

export interface TaskTableProps {
  tasks: Task[];
}

export function TaskTable({ tasks }: TaskTableProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const open = (id: string) => {
    dispatch(selectTask(id));
    navigate('/tarefas');
  };

  if (tasks.length === 0) {
    return <Empty>Nenhuma tarefa encontrada com os filtros atuais.</Empty>;
  }

  return (
    <Table role="table" aria-label="Tarefas ativas">
      <Head role="row">
        <span>Identidade da tarefa</span>
        <span>Status</span>
        <span>Prioridade</span>
        <span>Prazo</span>
      </Head>
      {tasks.map((task) => {
        const dd = daysUntil(task.dueDate);
        const urgent = dd !== null && dd <= 0 && task.priority === 'urgente';
        const showCountdown =
          task.priority === 'urgente' && dd !== null && dd >= 0 && dd <= 1 && task.dueDate;
        return (
          <Row key={task.id} role="row" onClick={() => open(task.id)}>
            <Identity>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={task.status === 'concluida'}
                  onChange={() => dispatch(toggleComplete(task.id))}
                  label={`Concluir ${task.title}`}
                />
              </div>
              <div>
                <strong>{task.title}</strong>
                <span>{task.description || 'Sem descrição'}</span>
              </div>
            </Identity>
            <Cell>
              <StatusBadge status={task.status} />
            </Cell>
            <Cell>
              <PriorityBadge priority={task.priority} />
            </Cell>
            <Cell>
              {showCountdown ? (
                <CountdownInline target={task.dueDate} />
              ) : (
                <Deadline $urgent={urgent}>{formatDeadline(task.dueDate)}</Deadline>
              )}
            </Cell>
          </Row>
        );
      })}
    </Table>
  );
}
