import styled from 'styled-components';
import { useCountdown } from '@/hooks/useCountdown';

const Mono = styled.span<{ $expired: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme, $expired }) => ($expired ? theme.colors.onSurfaceVariant : theme.colors.primary)};
`;

/** Countdown compacto HH:MM:SS para uso em linhas de tabela. */
export function CountdownInline({ target }: { target: string | null }) {
  const { hours, minutes, seconds, expired } = useCountdown(target);
  return (
    <Mono $expired={expired} role="timer" aria-live="off">
      {expired ? 'Vencida' : `${hours}:${minutes}:${seconds}`}
    </Mono>
  );
}
