import styled from 'styled-components';
import { glass } from '@/styles/mixins';

/** Superfície glass padrão (Level 2). */
export const Card = styled.section`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
`;

/** Variante sem padding interno (para cabeçalhos/tabelas customizadas). */
export const Panel = styled.div`
  ${glass};
`;
