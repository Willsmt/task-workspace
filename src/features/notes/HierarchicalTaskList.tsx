import styled from 'styled-components';
import type { Task } from '@/types/domain';
import { Checkbox } from '@/components/ui/Checkbox';
import { PriorityBadge } from '@/features/tasks/badges';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleComplete } from '@/features/tasks/tasksSlice';
import { selectRootTasks, selectSubtasksByParent } from '@/features/tasks/selectors';
import { selectTask } from '@/features/ui/uiSlice';
import { focusRing } from '@/styles/mixins';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: ${({ theme }) => theme.space.xs};
`;

const Item = styled.div<{ $active: boolean; $sub?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  text-align: left;
  cursor: pointer;
  padding: 10px 12px;
  margin-left: ${({ $sub }) => ($sub ? '26px' : '0')};
  border: 1px solid ${({ theme, $active }) => ($active ? theme.colors.borderStrong : 'transparent')};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $active }) => ($active ? theme.tint.neutralBg : 'transparent')};
  box-shadow: ${({ theme, $active }) => ($active ? `inset 2px 0 0 ${theme.colors.primary}` : 'none')};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    background: ${({ theme }) => theme.tint.neutralBg};
  }
`;

const Body = styled.div<{ $done: boolean }>`
  flex: 1;
  min-width: 0;

  strong {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme, $done }) => ($done ? theme.colors.onSurfaceFaint : theme.colors.onSurface)};
    text-decoration: ${({ $done }) => ($done ? 'line-through' : 'none')};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  span {
    display: block;
    margin-top: 3px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Meta = styled.div`
  margin-top: 8px;
`;

function Entry({ task, sub }: { task: Task; sub?: boolean }) {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector((s) => s.ui.selectedTaskId);
  const active = selectedId === task.id;
  const done = task.status === 'concluida';

  return (
    <Item
      $active={active}
      $sub={sub}
      role="treeitem"
      aria-selected={active}
      tabIndex={0}
      onClick={() => dispatch(selectTask(task.id))}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          dispatch(selectTask(task.id));
        }
      }}
    >
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={done}
          onChange={() => dispatch(toggleComplete(task.id))}
          label={`Concluir ${task.title}`}
        />
      </span>
      <Body $done={done}>
        <strong>{task.title}</strong>
        {!sub && <span>{task.description || 'Sem descrição'}</span>}
        {active && !sub && (
          <Meta>
            <PriorityBadge priority={task.priority} />
          </Meta>
        )}
      </Body>
    </Item>
  );
}

export function HierarchicalTaskList() {
  const roots = useAppSelector(selectRootTasks);
  const subsByParent = useAppSelector(selectSubtasksByParent);

  return (
    <List role="tree" aria-label="Tarefas hierárquicas">
      {roots.map((task) => (
        <div key={task.id}>
          <Entry task={task} />
          {(subsByParent[task.id] ?? []).map((sub) => (
            <Entry key={sub.id} task={sub} sub />
          ))}
        </div>
      ))}
    </List>
  );
}
