import styled from 'styled-components';

const Track = styled.div`
  width: 100%;
  height: 2px;
  background: ${({ theme }) => theme.colors.surfaceContainerHigh};
  border-radius: ${({ theme }) => theme.radius.full};
  overflow: hidden;
`;

const Fill = styled.div<{ $value: number; $tone?: string }>`
  height: 100%;
  width: ${({ $value }) => Math.min(100, Math.max(0, $value))}%;
  background: ${({ $tone, theme }) => $tone ?? theme.colors.primary};
  border-radius: inherit;
  transition: width ${({ theme }) => theme.transition.slow};
`;

export interface ProgressBarProps {
  value: number;
  tone?: string;
}

export function ProgressBar({ value, tone }: ProgressBarProps) {
  return (
    <Track
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <Fill $value={value} $tone={tone} />
    </Track>
  );
}
