/**
 * Tokens do Design System "Obsidian Crimson".
 * Fonte: DESIGN_SYSTEM.md (tokens) + Figma (uso real).
 * Em conflito: Figma manda no layout, DESIGN_SYSTEM nos tokens.
 */

export const theme = {
  colors: {
    // Fundações
    background: '#131313',
    surface: '#131313',
    surfaceContainerLowest: '#0e0e0e',
    surfaceContainerLow: '#1c1b1b',
    surfaceContainer: '#201f1f',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#353534',
    surfaceBright: '#393939',

    // Texto
    onSurface: '#e5e2e1',
    onSurfaceVariant: '#a1a1aa',
    onSurfaceFaint: '#71717a',
    heading: '#f4f4f5',

    // Acento crimson (sinal de alta energia)
    primary: '#ff3131',
    primaryHover: '#ff544b',
    primaryDim: '#c00014',
    onPrimary: '#ffffff',

    // Taxonomia de status
    urgent: '#ff3131',
    important: '#eab308',
    completed: '#10b981',
    inProgress: '#60a5fa',
    pending: '#a1a1aa',

    // Estrutura
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.14)',
    borderFaint: 'rgba(255, 255, 255, 0.04)',
    glass: 'rgba(30, 30, 30, 0.6)',
    glassHigh: 'rgba(30, 30, 30, 0.95)',
    inputFill: '#09090b',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },

  /** Cores translúcidas auxiliares (tints de status para chips/badges). */
  tint: {
    urgentBg: 'rgba(255, 49, 49, 0.12)',
    urgentBorder: 'rgba(255, 49, 49, 0.30)',
    importantBg: 'rgba(234, 179, 8, 0.12)',
    importantBorder: 'rgba(234, 179, 8, 0.30)',
    completedBg: 'rgba(16, 185, 129, 0.12)',
    completedBorder: 'rgba(16, 185, 129, 0.30)',
    inProgressBg: 'rgba(96, 165, 250, 0.12)',
    inProgressBorder: 'rgba(96, 165, 250, 0.30)',
    neutralBg: 'rgba(255, 255, 255, 0.05)',
  },

  font: {
    sans: "'Geist Sans', 'Geist', system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', 'SFMono-Regular', ui-monospace, monospace",
  },

  /** Escala tipográfica do DESIGN_SYSTEM. */
  type: {
    displayLg: { size: '48px', weight: 700, line: '1.1', spacing: '-0.04em' },
    headlineLg: { size: '32px', weight: 600, line: '1.2', spacing: '-0.02em' },
    headlineMd: { size: '24px', weight: 600, line: '1.3', spacing: '-0.01em' },
    bodyLg: { size: '18px', weight: 400, line: '1.6', spacing: '0' },
    bodyMd: { size: '16px', weight: 400, line: '1.6', spacing: '0' },
    bodySm: { size: '14px', weight: 400, line: '1.5', spacing: '0' },
    labelMd: { size: '12px', weight: 500, line: '1', spacing: '0.05em' },
  },

  space: {
    base: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    gutter: '20px',
  },

  radius: {
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },

  layout: {
    sidebarWidth: '248px',
    topbarHeight: '72px',
    contentMax: '1280px',
  },

  shadow: {
    glow: '0 0 15px rgba(255, 49, 49, 0.4)',
    glowSoft: '0 0 24px rgba(255, 49, 49, 0.18)',
    card: '0 1px 2px rgba(0, 0, 0, 0.4)',
    popover: '0 12px 40px rgba(0, 0, 0, 0.55)',
    inset: 'inset 0 1px 2px rgba(0, 0, 0, 0.5)',
  },

  /** min-width em px para media queries. */
  breakpoint: {
    mobile: 640,
    tablet: 960,
    desktop: 1280,
  },

  transition: {
    fast: '120ms ease',
    base: '180ms ease',
    slow: '280ms ease',
  },
} as const;

export type AppTheme = typeof theme;

/* Helpers de media query (mobile-first usado pontualmente; desktop é o alvo). */
export const media = {
  mobile: `@media (max-width: ${theme.breakpoint.mobile}px)`,
  belowTablet: `@media (max-width: ${theme.breakpoint.tablet - 1}px)`,
  tablet: `@media (min-width: ${theme.breakpoint.tablet}px)`,
  belowDesktop: `@media (max-width: ${theme.breakpoint.desktop - 1}px)`,
  desktop: `@media (min-width: ${theme.breakpoint.desktop}px)`,
};
