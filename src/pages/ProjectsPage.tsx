import styled from 'styled-components';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { FilterSidebar } from '@/features/projects/FilterSidebar';
import { ProjectCard } from '@/features/projects/ProjectCard';
import { TimelineGantt } from '@/features/projects/TimelineGantt';
import { IconPlus, IconTimeline, IconBoard, IconList } from '@/components/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectProjectsWithStats } from '@/features/projects/projectSelectors';
import { setNewTaskModal, setTimelineView } from '@/features/ui/uiSlice';
import { focusRing } from '@/styles/mixins';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr);
  gap: ${({ theme }) => theme.space.md};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
    grid-template-columns: 1fr;
  }
`;

const Fab = styled.button`
  position: fixed;
  right: 28px;
  bottom: 28px;
  z-index: 50;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  box-shadow: ${({ theme }) => theme.shadow.glow};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    transform: scale(1.06);
  }
`;

export function ProjectsPage() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector(selectProjectsWithStats);
  const view = useAppSelector((s) => s.ui.timelineView);

  return (
    <>
      <PageHeader
        title="Visão de Linha do Tempo"
        subtitle="Monitore o progresso dos projetos ao longo do trimestre com marcação precisa."
        actions={
          <>
            <SegmentedControl
              ariaLabel="Modo de visualização"
              value={view}
              onChange={(v) => dispatch(setTimelineView(v))}
              options={[
                { value: 'timeline', label: 'Timeline', icon: <IconTimeline width={15} height={15} /> },
                { value: 'quadro', label: 'Quadro', icon: <IconBoard width={15} height={15} /> },
                { value: 'lista', label: 'Lista', icon: <IconList width={15} height={15} /> },
              ]}
            />
            <Button $variant="primary" onClick={() => dispatch(setNewTaskModal(true))}>
              <IconPlus width={16} height={16} />
              Criar Nova Tarefa
            </Button>
          </>
        }
      />

      <Layout>
        <FilterSidebar />
        <Main>
          <Cards>
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </Cards>
          <TimelineGantt projects={projects} />
        </Main>
      </Layout>

      <Fab type="button" aria-label="Criar nova tarefa" onClick={() => dispatch(setNewTaskModal(true))}>
        <IconPlus width={22} height={22} />
      </Fab>
    </>
  );
}
