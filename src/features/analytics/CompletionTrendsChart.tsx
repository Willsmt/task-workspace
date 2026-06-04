import { useId } from 'react';
import styled from 'styled-components';
import type { TrendPoint } from '@/utils/derive';
import { theme } from '@/styles/theme';

const Svg = styled.svg`
  width: 100%;
  height: 220px;
  display: block;
`;

const Legend = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
  i {
    width: 14px;
    height: 3px;
    border-radius: 2px;
  }
`;

export interface CompletionTrendsChartProps {
  data: TrendPoint[];
}

function buildPath(values: number[], w: number, h: number, max: number, pad: number) {
  if (values.length === 0) return { line: '', area: '' };
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const step = innerW / Math.max(1, values.length - 1);
  const pts = values.map((v, i) => {
    const x = pad + i * step;
    const y = pad + innerH - (v / max) * innerH;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${h - pad} L${pad},${h - pad} Z`;
  return { line, area };
}

export function CompletionTrendsChart({ data }: CompletionTrendsChartProps) {
  const gradId = useId();
  const w = 720;
  const h = 220;
  const pad = 16;
  const max = Math.max(3, ...data.map((d) => Math.max(d.completed, d.target)));

  const completed = buildPath(data.map((d) => d.completed), w, h, max, pad);
  const target = buildPath(data.map((d) => d.target), w, h, max, pad);

  return (
    <div>
      <Legend>
        <span>
          <i style={{ background: theme.colors.primary }} /> Concluídas
        </span>
        <span>
          <i style={{ background: theme.colors.onSurfaceFaint }} /> Meta
        </span>
      </Legend>
      <Svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Tendência de conclusão de tarefas">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.colors.primary} stopOpacity="0.35" />
            <stop offset="100%" stopColor={theme.colors.primary} stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={pad}
            x2={w - pad}
            y1={pad + (h - pad * 2) * g}
            y2={pad + (h - pad * 2) * g}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        <path d={target.line} fill="none" stroke={theme.colors.onSurfaceFaint} strokeWidth={1.5} strokeDasharray="4 4" />
        <path d={completed.area} fill={`url(#${gradId})`} />
        <path d={completed.line} fill="none" stroke={theme.colors.primary} strokeWidth={2.5} strokeLinejoin="round" />
      </Svg>
    </div>
  );
}
