import styled, { css } from 'styled-components';
import { PRIORITY_LABEL, type Priority } from '@/types/domain';
import { focusRing } from '@/styles/mixins';

const Group = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
`;

const tones: Record<Priority, { color: string; bg: string; border: string }> = {
  urgente: { color: '#ff3131', bg: 'rgba(255,49,49,0.14)', border: 'rgba(255,49,49,0.5)' },
  importante: { color: '#eab308', bg: 'rgba(234,179,8,0.14)', border: 'rgba(234,179,8,0.5)' },
  normal: { color: '#a1a1aa', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.18)' },
};

const Option = styled.button<{ $active: boolean; $p: Priority }>`
  height: 38px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  ${({ $active, $p }) => {
    const t = tones[$p];
    return $active
      ? css`
          color: ${t.color};
          background: ${t.bg};
          border: 1px solid ${t.border};
        `
      : css`
          color: ${({ theme }) => theme.colors.onSurfaceVariant};
          background: transparent;
          border: 1px solid ${({ theme }) => theme.colors.border};
          &:hover {
            border-color: ${({ theme }) => theme.colors.borderStrong};
            color: ${({ theme }) => theme.colors.onSurface};
          }
        `;
  }}
`;

const ORDER: Priority[] = ['urgente', 'importante', 'normal'];

export interface PriorityPickerProps {
  value: Priority;
  onChange: (p: Priority) => void;
}

export function PriorityPicker({ value, onChange }: PriorityPickerProps) {
  return (
    <Group role="radiogroup" aria-label="Prioridade">
      {ORDER.map((p) => (
        <Option
          key={p}
          type="button"
          role="radio"
          aria-checked={value === p}
          $active={value === p}
          $p={p}
          onClick={() => onChange(p)}
        >
          {PRIORITY_LABEL[p]}
        </Option>
      ))}
    </Group>
  );
}
