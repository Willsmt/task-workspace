import styled from 'styled-components';
import type { Task } from '@/types/domain';
import { StatusBadge } from '@/features/tasks/badges';
import { formatShortDate } from '@/utils/date';

const Table = styled.div`
  display: flex;
  flex-direction: column;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 120px;
  gap: 12px;
  padding: 0 0 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 10.5px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
    grid-template-columns: 1fr auto;
    span:nth-child(3) {
      display: none;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 150px 120px;
  gap: 12px;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderFaint};

  &:last-child {
    border-bottom: none;
  }

  strong {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.onSurface};
  }
  time {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
    grid-template-columns: 1fr auto;
    time {
      display: none;
    }
  }
`;

export function RecentTasksTable({ tasks }: { tasks: Task[] }) {
  return (
    <Table>
      <Head>
        <span>Tarefa</span>
        <span>Status</span>
        <span>Atualizada</span>
      </Head>
      {tasks.map((t) => (
        <Row key={t.id}>
          <strong>{t.title}</strong>
          <StatusBadge status={t.status} />
          <time>{formatShortDate(t.completedAt ?? t.createdAt)}</time>
        </Row>
      ))}
    </Table>
  );
}
