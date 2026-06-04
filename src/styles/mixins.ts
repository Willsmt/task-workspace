import { css } from 'styled-components';

/**
 * Superfície glass (Level 2): translúcida + blur + borda sutil.
 * Os cards Task Note usam blur(12px) e uma borda em gradiente (luz vinda de cima).
 */
export const glass = css`
  position: relative;
  background: ${({ theme }) => theme.colors.glass};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};

  /* Borda superior levemente iluminada. */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.12),
      rgba(255, 255, 255, 0) 40%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

/** Glow crimson para CTAs focados/hover. */
export const glow = css`
  box-shadow: ${({ theme }) => theme.shadow.glow};
`;

/** Rótulo monoespaçado em caixa alta (metadados/sistema). */
export const monoLabel = css`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.labelMd.size};
  font-weight: ${({ theme }) => theme.type.labelMd.weight};
  letter-spacing: ${({ theme }) => theme.type.labelMd.spacing};
  line-height: ${({ theme }) => theme.type.labelMd.line};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
`;

/** Anel de foco acessível (não remover sem substituto). */
export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Scrollbar discreta no tema escuro. */
export const customScrollbar = css`
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.surfaceContainerHigh} transparent;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.surfaceContainerHigh};
    border-radius: ${({ theme }) => theme.radius.full};
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
