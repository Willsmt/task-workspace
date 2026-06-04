import { createGlobalStyle } from 'styled-components';
import { customScrollbar } from './mixins';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    color-scheme: dark;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.type.bodyMd.size};
    line-height: ${({ theme }) => theme.type.bodyMd.line};
    color: ${({ theme }) => theme.colors.onSurface};
    background: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    ${customScrollbar};
  }

  /* Atmosfera de fundo: gradientes radiais sutis + grade. */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -2;
    background:
      radial-gradient(620px circle at 82% 8%, rgba(255, 49, 49, 0.10), transparent 60%),
      radial-gradient(720px circle at 12% 88%, rgba(96, 165, 250, 0.06), transparent 60%);
    pointer-events: none;
  }

  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    mask-image: radial-gradient(circle at 50% 40%, #000 30%, transparent 90%);
    pointer-events: none;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.heading};
    letter-spacing: -0.01em;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }

  input,
  textarea,
  select,
  button {
    font: inherit;
    color: inherit;
  }

  ::selection {
    background: rgba(255, 49, 49, 0.3);
    color: #fff;
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;
