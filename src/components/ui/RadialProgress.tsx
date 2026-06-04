import styled from 'styled-components';

const Wrap = styled.div<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  flex-shrink: 0;
`;

const Center = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  strong {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 22px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
  }
  span {
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

export interface RadialProgressProps {
  value: number; // 0–100
  size?: number;
  stroke?: number;
  tone?: string;
  label?: string;
  showValue?: boolean;
}

export function RadialProgress({
  value,
  size = 132,
  stroke = 10,
  tone,
  label,
  showValue = true,
}: RadialProgressProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = c - (clamped / 100) * c;

  return (
    <Wrap $size={size}>
      <svg width={size} height={size} role="img" aria-label={`${Math.round(clamped)}% ${label ?? ''}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tone ?? '#ff3131'}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 600ms ease' }}
        />
      </svg>
      {showValue && (
        <Center>
          <strong>{Math.round(clamped)}%</strong>
          {label && <span>{label}</span>}
        </Center>
      )}
    </Wrap>
  );
}
