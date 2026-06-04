import styled from 'styled-components';
import { IconCheck } from '@/components/icons';
import { focusRing } from '@/styles/mixins';

const Box = styled.button<{ $checked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.base};
  border: 1.5px solid
    ${({ theme, $checked }) => ($checked ? theme.colors.completed : theme.colors.borderStrong)};
  background: ${({ theme, $checked }) => ($checked ? theme.colors.completed : 'transparent')};
  color: ${({ theme }) => theme.colors.background};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    border-color: ${({ theme, $checked }) =>
      $checked ? theme.colors.completed : theme.colors.onSurfaceVariant};
  }

  svg {
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transform: scale(${({ $checked }) => ($checked ? 1 : 0.6)});
    transition: all ${({ theme }) => theme.transition.fast};
  }
`;

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export function Checkbox({ checked, onChange, label }: CheckboxProps) {
  return (
    <Box
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      $checked={checked}
      onClick={onChange}
    >
      <IconCheck width={13} height={13} strokeWidth={3} />
    </Box>
  );
}
