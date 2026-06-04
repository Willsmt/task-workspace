import styled from 'styled-components';
import type { ProjectWithStats } from './projectSelectors';
import { glass, monoLabel } from '@/styles/mixins';
import { theme } from '@/styles/theme';
import type { Priority } from '@/types/domain';

const Wrap = styled.div`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space.md};

  h3 {
    ${monoLabel};
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

const Legend = styled.div`
  display: flex;
  gap: 14px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }
`;

const Months = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  margin-bottom: 8px;
`;

const MonthCells = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);

  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
    padding-bottom: 6px;
    border-left: 1px solid ${({ theme }) => theme.colors.borderFaint};
    padding-left: 8px;
  }
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  height: 40px;

  & > label {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.onSurface};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 12px;
  }
`;

const Lane = styled.div`
  position: relative;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.colors.borderFaint};
`;

const Bar = styled.div<{ $tone: string }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 16px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: linear-gradient(90deg, ${({ $tone }) => $tone}, ${({ $tone }) => $tone}aa);
  box-shadow: 0 0 12px ${({ $tone }) => $tone}55;
  min-width: 18px;
`;

const toneFor = (p: Priority) =>
  p === 'urgente' ? theme.colors.urgent : p === 'importante' ? theme.colors.important : theme.colors.inProgress;

export interface TimelineGanttProps {
  projects: ProjectWithStats[];
}

export function TimelineGantt({ projects }: TimelineGanttProps) {
  if (projects.length === 0) return null;

  const starts = projects.map((p) => new Date(p.startDate).getTime());
  const ends = projects.map((p) => new Date(p.endDate).getTime());
  const min = Math.min(...starts);
  const max = Math.max(...ends);
  const span = Math.max(1, max - min);

  // Divide o intervalo em ~5 colunas mensais.
  const cols = 5;
  const monthLabels = Array.from({ length: cols }, (_, i) => {
    const t = min + (span * i) / cols;
    return new Intl.DateTimeFormat('pt-BR', { month: 'short' }).format(new Date(t));
  });

  return (
    <Wrap>
      <Head>
        <h3>Linha do Tempo</h3>
        <Legend>
          <span>
            <i style={{ background: theme.colors.urgent }} /> Urgente
          </span>
          <span>
            <i style={{ background: theme.colors.important }} /> Importante
          </span>
          <span>
            <i style={{ background: theme.colors.inProgress }} /> Normal
          </span>
        </Legend>
      </Head>

      <Months>
        <span />
        <MonthCells $cols={cols}>
          {monthLabels.map((m, i) => (
            <span key={i}>{m}</span>
          ))}
        </MonthCells>
      </Months>

      {projects.map((p) => {
        const left = ((new Date(p.startDate).getTime() - min) / span) * 100;
        const width = ((new Date(p.endDate).getTime() - new Date(p.startDate).getTime()) / span) * 100;
        return (
          <Track key={p.id}>
            <label>{p.name}</label>
            <Lane>
              <Bar
                $tone={toneFor(p.priority)}
                style={{ left: `${left}%`, width: `${Math.max(4, width)}%` }}
                title={`${p.progress}%`}
              />
            </Lane>
          </Track>
        );
      })}
    </Wrap>
  );
}
