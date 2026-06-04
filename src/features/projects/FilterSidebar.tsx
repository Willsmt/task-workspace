import styled from 'styled-components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectOverallProgress, selectPriorityCounts } from './projectSelectors';
import { RadialProgress } from '@/components/ui/RadialProgress';
import { PRIORITY_LABEL, type Priority } from '@/types/domain';
import { Button } from '@/components/ui/Button';
import { glass, monoLabel } from '@/styles/mixins';
import { theme } from '@/styles/theme';

const Wrap = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const Block = styled.div`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
`;

const Title = styled.h3`
  ${monoLabel};
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const FilterRow = styled.button<{ $tone: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 12px;
  margin-bottom: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 13px;
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  & > span:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  & > span:first-child::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: ${({ $tone }) => $tone};
  }
  & > span:last-child {
    font-family: ${({ theme }) => theme.font.mono};
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
  }
`;

const Health = styled(Block)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

const DeepWork = styled(Block)`
  background: linear-gradient(160deg, rgba(255, 49, 49, 0.18), ${({ theme }) => theme.colors.glass});

  h4 {
    font-size: 15px;
    margin-bottom: 6px;
  }
  p {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.onSurfaceVariant};
    margin-bottom: ${({ theme }) => theme.space.sm};
  }
`;

const tones: Record<Priority, string> = {
  urgente: theme.colors.urgent,
  importante: theme.colors.important,
  normal: theme.colors.pending,
};

const ORDER: Priority[] = ['urgente', 'importante', 'normal'];

export function FilterSidebar() {
  const counts = useAppSelector(selectPriorityCounts);
  const overall = useAppSelector(selectOverallProgress);

  return (
    <Wrap>
      <Block>
        <Title>Filtrar por Prioridade</Title>
        {ORDER.map((p) => (
          <FilterRow key={p} type="button" $tone={tones[p]}>
            <span>{PRIORITY_LABEL[p]}</span>
            <span>{counts[p]}</span>
          </FilterRow>
        ))}
      </Block>

      <Health>
        <Title style={{ alignSelf: 'flex-start' }}>Saúde dos Projetos</Title>
        <RadialProgress value={overall} label="Progresso Geral" tone={theme.colors.primary} />
      </Health>

      <DeepWork>
        <h4>Modo Foco</h4>
        <p>Silencie notificações e concentre-se nas tarefas urgentes do ciclo atual.</p>
        <Button $variant="secondary" $size="sm" $full>
          Ativar Modo Foco
        </Button>
      </DeepWork>
    </Wrap>
  );
}
