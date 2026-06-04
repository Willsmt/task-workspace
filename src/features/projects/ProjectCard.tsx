import styled from 'styled-components';
import type { ProjectWithStats } from './projectSelectors';
import { PriorityBadge } from '@/features/tasks/badges';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CountdownInline } from '@/features/tasks/CountdownInline';
import { IconClock } from '@/components/icons';
import { formatDeadline } from '@/utils/date';
import { glass } from '@/styles/mixins';
import { theme } from '@/styles/theme';

const Card = styled.article`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: border-color ${({ theme }) => theme.transition.base};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const Top = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;

  h3 {
    font-size: 17px;
    font-weight: 600;
  }
  span {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

const Foot = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Time = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};

  svg {
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

const Pct = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

const toneFor = (p: ProjectWithStats['priority']) =>
  p === 'urgente' ? theme.colors.urgent : p === 'importante' ? theme.colors.important : theme.colors.inProgress;

export function ProjectCard({ project }: { project: ProjectWithStats }) {
  const urgent = project.priority === 'urgente';
  return (
    <Card>
      <Top>
        <div>
          <h3>{project.name}</h3>
          <span>{project.taskCount} tarefas vinculadas</span>
        </div>
        <PriorityBadge priority={project.priority} />
      </Top>

      <div>
        <ProgressBar value={project.progress} tone={toneFor(project.priority)} />
      </div>

      <Foot>
        <Time>
          <IconClock width={14} height={14} />
          {urgent ? <CountdownInline target={project.endDate} /> : formatDeadline(project.endDate)}
        </Time>
        <Pct>{project.progress}%</Pct>
      </Foot>
    </Card>
  );
}
