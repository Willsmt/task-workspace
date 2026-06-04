import styled from 'styled-components';
import type { PriorityBreakdown } from '@/utils/derive';
import { PRIORITY_LABEL, type Priority } from '@/types/domain';
import { theme } from '@/styles/theme';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

  span:first-child {
    color: ${({ theme }) => theme.colors.onSurface};
  }
  span:last-child {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
`;

const Bar = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  overflow: hidden;
`;

const Fill = styled.div<{ $tone: string; $w: number }>`
  height: 100%;
  width: ${({ $w }) => $w}%;
  background: ${({ $tone }) => $tone};
  border-radius: inherit;
  transition: width 600ms ease;
`;

const tones: Record<Priority, string> = {
  urgente: theme.colors.urgent,
  importante: theme.colors.important,
  normal: theme.colors.inProgress,
};

export function PriorityMap({ data }: { data: PriorityBreakdown[] }) {
  return (
    <Wrap>
      {data.map((d) => (
        <Row key={d.priority}>
          <Top>
            <span>{PRIORITY_LABEL[d.priority]}</span>
            <span>{d.count}</span>
          </Top>
          <Bar>
            <Fill $tone={tones[d.priority]} $w={Math.round(d.ratio * 100)} />
          </Bar>
        </Row>
      ))}
    </Wrap>
  );
}
