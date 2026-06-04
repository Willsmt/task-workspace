import { useEffect } from 'react';
import styled from 'styled-components';
import { Panel } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HierarchicalTaskList } from '@/features/notes/HierarchicalTaskList';
import { NoteEditor } from '@/features/notes/NoteEditor';
import { MetadataPane } from '@/features/notes/MetadataPane';
import { IconPlus } from '@/components/icons';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectRootTasks } from '@/features/tasks/selectors';
import { selectTask } from '@/features/ui/uiSlice';
import { upsertNote } from '@/features/notes/notesSlice';
import { linkNote } from '@/features/tasks/tasksSlice';
import { monoLabel } from '@/styles/mixins';

const Layout = styled.div`
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr) 280px;
  gap: ${({ theme }) => theme.space.md};
  align-items: start;
  height: calc(100vh - ${({ theme }) => theme.layout.topbarHeight} - ${({ theme }) => theme.space.lg} * 2);

  @media (max-width: ${({ theme }) => theme.breakpoint.desktop - 1}px) {
    grid-template-columns: 280px minmax(0, 1fr);
    height: auto;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled(Panel)`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    max-height: none;
  }
`;

const ColHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px ${({ theme }) => theme.space.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  h2 {
    font-size: 14px;
    ${monoLabel};
    color: ${({ theme }) => theme.colors.onSurface};
  }
`;

const ListScroll = styled.div`
  overflow-y: auto;
  flex: 1;
`;

const EditorPanel = styled(Panel)`
  height: 100%;
  overflow: hidden;
`;

const SideCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: ${({ theme }) => theme.breakpoint.desktop - 1}px) {
    grid-column: 1 / -1;
  }
`;

const EmptyNote = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: ${({ theme }) => theme.space.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.onSurfaceFaint};
  font-size: 14px;
`;

export function TasksNotesPage() {
  const dispatch = useAppDispatch();
  const roots = useAppSelector(selectRootTasks);
  const selectedId = useAppSelector((s) => s.ui.selectedTaskId);
  const tasks = useAppSelector((s) => s.tasks.items);
  const notes = useAppSelector((s) => s.notes.items);

  // Garante uma tarefa selecionada ao abrir a tela.
  useEffect(() => {
    if (!selectedId && roots[0]) dispatch(selectTask(roots[0].id));
  }, [selectedId, roots, dispatch]);

  const task = tasks.find((t) => t.id === selectedId) ?? null;
  const note = task?.noteId ? (notes.find((n) => n.id === task.noteId) ?? null) : null;

  const handleCreateNote = () => {
    if (!task) return;
    const action = upsertNote({ taskId: task.id, title: task.title });
    dispatch(action);
    dispatch(linkNote({ taskId: task.id, noteId: action.payload.id }));
  };

  return (
    <Layout>
      <Column>
        <ColHead>
          <h2>Tarefas Hierárquicas</h2>
          <Button
            $variant="ghost"
            $size="sm"
            onClick={() => dispatch(selectTask(null))}
            aria-label="Limpar seleção"
          >
            Limpar
          </Button>
        </ColHead>
        <ListScroll>
          <HierarchicalTaskList />
        </ListScroll>
      </Column>

      <EditorPanel>
        {task && !note ? (
          <EmptyNote>
            <p>A tarefa “{task.title}” ainda não tem uma nota vinculada.</p>
            <Button $variant="secondary" $size="md" onClick={handleCreateNote}>
              <IconPlus width={16} height={16} />
              Criar nota para esta tarefa
            </Button>
          </EmptyNote>
        ) : (
          <NoteEditor note={note} />
        )}
      </EditorPanel>

      <SideCol>
        {task && <MetadataPane task={task} tags={note?.tags ?? []} />}
      </SideCol>
    </Layout>
  );
}
