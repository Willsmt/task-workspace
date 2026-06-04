import styled from 'styled-components';
import { focusRing } from '@/styles/mixins';

export const IconButton = styled.button<{ $active?: boolean; $size?: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => $size ?? 38}px;
  height: ${({ $size }) => $size ?? 38}px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.border : 'transparent')};
  background: ${({ theme, $active }) => ($active ? theme.tint.neutralBg : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.onSurface : theme.colors.onSurfaceVariant)};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    color: ${({ theme }) => theme.colors.onSurface};
    background: ${({ theme }) => theme.tint.neutralBg};
  }
`;
