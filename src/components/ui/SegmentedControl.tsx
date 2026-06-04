import styled from 'styled-components';
import { focusRing } from '@/styles/mixins';

const Group = styled.div`
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
`;

const Segment = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 30px;
  padding: 0 12px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.base};
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ theme, $active }) => ($active ? theme.colors.onPrimary : theme.colors.onSurfaceVariant)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    color: ${({ theme, $active }) => ($active ? theme.colors.onPrimary : theme.colors.onSurface)};
  }
`;

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <Group role="tablist" aria-label={ariaLabel}>
      {options.map((opt) => (
        <Segment
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          $active={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.icon}
          {opt.label}
        </Segment>
      ))}
    </Group>
  );
}
