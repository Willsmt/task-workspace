import styled from 'styled-components';
import { theme } from '@/styles/theme';

const Wrap = styled.div`
  display: flex;
  gap: 3px;
  overflow-x: auto;
  padding-bottom: 4px;
`;

const Week = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Cell = styled.span<{ $level: number }>`
  width: 13px;
  height: 13px;
  border-radius: 3px;
  background: ${({ $level }) => LEVEL_COLORS[$level] ?? LEVEL_COLORS[0]};
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  margin-top: 12px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.onSurfaceFaint};

  i {
    width: 12px;
    height: 12px;
    border-radius: 3px;
  }
`;

const LEVEL_COLORS = [
  'rgba(255,255,255,0.04)',
  'rgba(255,49,49,0.25)',
  'rgba(255,49,49,0.45)',
  'rgba(255,49,49,0.7)',
  theme.colors.primary,
];

export function ExecutionHeatmap({ grid }: { grid: number[][] }) {
  return (
    <>
      <Wrap role="img" aria-label="Frequência de execução nas últimas semanas">
        {grid.map((week, w) => (
          <Week key={w}>
            {week.map((level, d) => (
              <Cell key={`${w}-${d}`} $level={level} title={`Intensidade ${level}`} />
            ))}
          </Week>
        ))}
      </Wrap>
      <Footer>
        Menos
        {LEVEL_COLORS.map((c, i) => (
          <i key={i} style={{ background: c }} />
        ))}
        Mais
      </Footer>
    </>
  );
}
