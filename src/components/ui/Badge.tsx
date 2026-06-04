import styled, { css } from 'styled-components';

export type Tone = 'urgent' | 'important' | 'completed' | 'inProgress' | 'neutral';

const tones: Record<Tone, ReturnType<typeof css>> = {
  urgent: css`
    color: ${({ theme }) => theme.colors.urgent};
    background: ${({ theme }) => theme.tint.urgentBg};
    border-color: ${({ theme }) => theme.tint.urgentBorder};
  `,
  important: css`
    color: ${({ theme }) => theme.colors.important};
    background: ${({ theme }) => theme.tint.importantBg};
    border-color: ${({ theme }) => theme.tint.importantBorder};
  `,
  completed: css`
    color: ${({ theme }) => theme.colors.completed};
    background: ${({ theme }) => theme.tint.completedBg};
    border-color: ${({ theme }) => theme.tint.completedBorder};
  `,
  inProgress: css`
    color: ${({ theme }) => theme.colors.inProgress};
    background: ${({ theme }) => theme.tint.inProgressBg};
    border-color: ${({ theme }) => theme.tint.inProgressBorder};
  `,
  neutral: css`
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    background: ${({ theme }) => theme.tint.neutralBg};
    border-color: ${({ theme }) => theme.colors.border};
  `,
};

export const Badge = styled.span<{ $tone?: Tone; $dot?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 9px;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.full};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  white-space: nowrap;
  ${({ $tone = 'neutral' }) => tones[$tone]};

  ${({ $dot }) =>
    $dot &&
    css`
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: currentColor;
        box-shadow: 0 0 6px currentColor;
      }
    `}
`;
