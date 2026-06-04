import styled from 'styled-components';
import type { StatusRatio } from '@/utils/derive';
import { theme } from '@/styles/theme';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

const DonutBox = styled.div`
  position: relative;
  width: 150px;
  height: 150px;

  & > div {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  strong {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 28px;
    color: ${({ theme }) => theme.colors.heading};
  }
  span {
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  i {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 3px;
    margin-right: 8px;
  }
  b {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

export function StatusRatioDonut({ ratio }: { ratio: StatusRatio }) {
  const total = Math.max(1, ratio.concluida + ratio.em_progresso + ratio.pendente);
  const done = (ratio.concluida / total) * 100;
  const prog = (ratio.em_progresso / total) * 100;

  const bg = `conic-gradient(
    ${theme.colors.completed} 0% ${done}%,
    ${theme.colors.inProgress} ${done}% ${done + prog}%,
    ${theme.colors.surfaceContainerHigh} ${done + prog}% 100%
  )`;

  return (
    <Wrap>
      <DonutBox>
        <div
          style={{
            background: bg,
            borderRadius: '50%',
            WebkitMask: 'radial-gradient(circle, transparent 54%, #000 55%)',
            mask: 'radial-gradient(circle, transparent 54%, #000 55%)',
          }}
        />
        <div>
          <strong>{ratio.completedPct}%</strong>
          <span>Conclusão</span>
        </div>
      </DonutBox>

      <Legend>
        <div>
          <span>
            <i style={{ background: theme.colors.completed }} />
            Concluídas
          </span>
          <b>{ratio.concluida}</b>
        </div>
        <div>
          <span>
            <i style={{ background: theme.colors.inProgress }} />
            Em progresso
          </span>
          <b>{ratio.em_progresso}</b>
        </div>
        <div>
          <span>
            <i style={{ background: theme.colors.surfaceContainerHigh }} />
            Pendentes
          </span>
          <b>{ratio.pendente}</b>
        </div>
      </Legend>
    </Wrap>
  );
}
