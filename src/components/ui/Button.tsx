import styled, { css } from 'styled-components';
import { focusRing } from '@/styles/mixins';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  $variant?: Variant;
  $size?: Size;
  $full?: boolean;
}

const sizes: Record<Size, ReturnType<typeof css>> = {
  sm: css`
    height: 32px;
    padding: 0 12px;
    font-size: 13px;
  `,
  md: css`
    height: 40px;
    padding: 0 16px;
    font-size: 14px;
  `,
  lg: css`
    height: 48px;
    padding: 0 22px;
    font-size: 15px;
  `,
};

const variants: Record<Variant, ReturnType<typeof css>> = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};
    border: 1px solid transparent;
    font-weight: 600;
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
      box-shadow: ${({ theme }) => theme.shadow.glow};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.tint.neutralBg};
    color: ${({ theme }) => theme.colors.onSurface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.borderStrong};
      background: rgba(255, 255, 255, 0.08);
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.onSurface};
      background: ${({ theme }) => theme.tint.neutralBg};
    }
  `,
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.font.sans};
  font-weight: 500;
  white-space: nowrap;
  transition:
    background ${({ theme }) => theme.transition.base},
    box-shadow ${({ theme }) => theme.transition.base},
    border-color ${({ theme }) => theme.transition.base};
  width: ${({ $full }) => ($full ? '100%' : 'auto')};
  ${({ $size = 'md' }) => sizes[$size]};
  ${({ $variant = 'primary' }) => variants[$variant]};
  ${focusRing};

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    flex-shrink: 0;
  }
`;
