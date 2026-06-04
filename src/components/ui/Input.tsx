import styled from 'styled-components';

/** Campo recessado (fill escuro + inset shadow). Foco vira linha crimson. */
export const Input = styled.input`
  width: 100%;
  height: 42px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.inputFill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 14px;
  box-shadow: ${({ theme }) => theme.shadow.inset};
  transition: border-color ${({ theme }) => theme.transition.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 12px 14px;
  resize: vertical;
  background: ${({ theme }) => theme.colors.inputFill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 14px;
  line-height: 1.6;
  box-shadow: ${({ theme }) => theme.shadow.inset};
  transition: border-color ${({ theme }) => theme.transition.base};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Field = styled.label`
  display: block;

  & > span {
    display: block;
    margin-bottom: 8px;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
`;
