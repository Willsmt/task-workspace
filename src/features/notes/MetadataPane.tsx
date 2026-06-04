import styled from 'styled-components';
import type { Status, Task } from '@/types/domain';
import { STATUS_LABEL } from '@/types/domain';
import { PriorityPicker } from '@/features/tasks/PriorityPicker';
import { Badge } from '@/components/ui/Badge';
import { formatShortDate } from '@/utils/date';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setPriority, setStatus, updateTask } from '@/features/tasks/tasksSlice';
import { glass, monoLabel } from '@/styles/mixins';

const Pane = styled.aside`
  ${glass};
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.span`
  ${monoLabel};
`;

const Select = styled.select`
  height: 38px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.inputFill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 13px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const DateInput = styled.input`
  height: 38px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.inputFill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 13px;
  font-family: ${({ theme }) => theme.font.mono};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const STATUS_VALUES: Status[] = ['pendente', 'em_progresso', 'concluida'];

function toInputDate(iso: string | null): string {
  if (!iso) return '';
  return new Date(iso).toISOString().slice(0, 10);
}

export interface MetadataPaneProps {
  task: Task;
  tags: string[];
}

export function MetadataPane({ task, tags }: MetadataPaneProps) {
  const dispatch = useAppDispatch();

  return (
    <Pane aria-label="Propriedades da tarefa">
      <Row>
        <Label>Prioridade</Label>
        <PriorityPicker
          value={task.priority}
          onChange={(priority) => dispatch(setPriority({ id: task.id, priority }))}
        />
      </Row>

      <Row>
        <Label>Status</Label>
        <Select
          value={task.status}
          aria-label="Status"
          onChange={(e) => dispatch(setStatus({ id: task.id, status: e.target.value as Status }))}
        >
          {STATUS_VALUES.map((s) => (
            <option key={s} value={s}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </Select>
      </Row>

      <Row>
        <Label>Prazo final {task.dueDate && `· ${formatShortDate(task.dueDate)}`}</Label>
        <DateInput
          type="date"
          value={toInputDate(task.dueDate)}
          aria-label="Prazo final"
          onChange={(e) =>
            dispatch(
              updateTask({
                id: task.id,
                changes: { dueDate: e.target.value ? new Date(e.target.value).toISOString() : null },
              }),
            )
          }
        />
      </Row>

      {tags.length > 0 && (
        <Row>
          <Label>Tags</Label>
          <Tags>
            {tags.map((tag) => (
              <Badge key={tag} $tone="neutral">
                {tag}
              </Badge>
            ))}
          </Tags>
        </Row>
      )}
    </Pane>
  );
}
