import { Badge, type Tone } from '@/components/ui/Badge';
import { PRIORITY_LABEL, STATUS_LABEL, type Priority, type Status } from '@/types/domain';

const priorityTone: Record<Priority, Tone> = {
  urgente: 'urgent',
  importante: 'important',
  normal: 'neutral',
};

const statusTone: Record<Status, Tone> = {
  pendente: 'neutral',
  em_progresso: 'inProgress',
  concluida: 'completed',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge $tone={priorityTone[priority]} $dot>
      {PRIORITY_LABEL[priority]}
    </Badge>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return <Badge $tone={statusTone[status]}>{STATUS_LABEL[status]}</Badge>;
}
