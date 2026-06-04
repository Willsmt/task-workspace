import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { Field, Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { PriorityPicker } from './PriorityPicker';
import type { Priority } from '@/types/domain';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addTask, type NewTaskInput } from './tasksSlice';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;

export interface NewTaskFormProps {
  onCreated?: () => void;
}

const empty = {
  title: '',
  description: '',
  priority: 'normal' as Priority,
  dueDate: '',
};

export function NewTaskForm({ onCreated }: NewTaskFormProps) {
  const dispatch = useAppDispatch();
  const [draft, setDraft] = useState(empty);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draft.title.trim()) return;
    const payload: NewTaskInput = {
      title: draft.title,
      description: draft.description,
      priority: draft.priority,
      dueDate: draft.dueDate ? new Date(draft.dueDate).toISOString() : null,
    };
    dispatch(addTask(payload));
    setDraft(empty);
    onCreated?.();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <span>Nome da tarefa</span>
        <Input
          value={draft.title}
          required
          placeholder="Defina o objetivo…"
          onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        />
      </Field>

      <Field>
        <span>Descrição / condições de conclusão</span>
        <Textarea
          value={draft.description}
          placeholder="O que precisa ser verdadeiro para concluir?"
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
        />
      </Field>

      <Field as="div">
        <span>Prioridade</span>
        <PriorityPicker
          value={draft.priority}
          onChange={(priority) => setDraft({ ...draft, priority })}
        />
      </Field>

      <Field>
        <span>Prazo</span>
        <Input
          type="date"
          value={draft.dueDate}
          onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
        />
      </Field>

      <Button type="submit" $variant="primary" $full $size="lg" disabled={!draft.title.trim()}>
        Criar Tarefa
      </Button>
    </Form>
  );
}
