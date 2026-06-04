import styled from 'styled-components';
import { useCountdown } from '@/hooks/useCountdown';

const Time = styled.span<{ $expired: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 34px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.01em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $expired }) => ($expired ? theme.colors.onSurfaceVariant : theme.colors.primary)};
  text-shadow: ${({ $expired, theme }) => ($expired ? 'none' : theme.shadow.glowSoft)};

  & small {
    font-size: 16px;
    opacity: 0.6;
  }
`;

export interface CountdownTimerProps {
  target: string | null;
}

export function CountdownTimer({ target }: CountdownTimerProps) {
  const { hours, minutes, seconds, expired } = useCountdown(target);
  return (
    <Time $expired={expired} aria-live="polite" role="timer">
      {expired ? (
        '--:--:--'
      ) : (
        <>
          {hours}
          <small>:</small>
          {minutes}
          <small>:</small>
          {seconds}
        </>
      )}
    </Time>
  );
}
