import styled from 'styled-components';
import { glass, monoLabel } from '@/styles/mixins';

const Wrap = styled.div<{ $accent?: string }>`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 116px;

  ${({ $accent }) =>
    $accent &&
    `&::after {
      content: '';
      position: absolute;
      left: 0;
      top: 16px;
      bottom: 16px;
      width: 2px;
      border-radius: 2px;
      background: ${$accent};
    }`}
`;

const Label = styled.span`
  ${monoLabel};
`;

const Value = styled.strong<{ $mono?: boolean; $color?: string }>`
  font-family: ${({ theme, $mono }) => ($mono ? theme.font.mono : theme.font.sans)};
  font-size: ${({ $mono }) => ($mono ? '34px' : '40px')};
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${({ theme, $color }) => $color ?? theme.colors.heading};
  font-variant-numeric: tabular-nums;
`;

const Foot = styled.span<{ $tone?: string }>`
  font-size: 12px;
  color: ${({ theme, $tone }) => $tone ?? theme.colors.onSurfaceVariant};
`;

export interface StatCardProps {
  label: string;
  value: React.ReactNode;
  footer?: React.ReactNode;
  footerTone?: string;
  valueColor?: string;
  mono?: boolean;
  accent?: string;
}

export function StatCard({
  label,
  value,
  footer,
  footerTone,
  valueColor,
  mono,
  accent,
}: StatCardProps) {
  return (
    <Wrap $accent={accent}>
      <Label>{label}</Label>
      <Value $mono={mono} $color={valueColor}>
        {value}
      </Value>
      {footer && <Foot $tone={footerTone}>{footer}</Foot>}
    </Wrap>
  );
}
