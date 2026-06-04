/**
 * Modelo de domínio do Task Note.
 * Toda a aplicação fala português; os identificadores de enum também.
 */

export type Priority = 'urgente' | 'importante' | 'normal';

export type Status = 'pendente' | 'em_progresso' | 'concluida';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  /** ISO 8601 ou null quando sem prazo definido. */
  dueDate: string | null;
  projectId: string | null;
  /** Nota de longo formato vinculada à tarefa. */
  noteId: string | null;
  /** Hierarquia: id da tarefa-mãe (subtarefas) ou null no nível raiz. */
  parentId: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface Note {
  id: string;
  taskId: string | null;
  title: string;
  /** Conteúdo em texto rico simples (markdown-like). */
  content: string;
  updatedAt: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  priority: Priority;
  /** 0–100. */
  progress: number;
  /** ISO — início e fim usados na timeline (gantt). */
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  /** URL do avatar; quando null, exibimos as iniciais. */
  avatar: string | null;
}

/** Rótulos de exibição em português para os enums. */
export const PRIORITY_LABEL: Record<Priority, string> = {
  urgente: 'Urgente',
  importante: 'Importante',
  normal: 'Normal',
};

export const STATUS_LABEL: Record<Status, string> = {
  pendente: 'Pendente',
  em_progresso: 'Em Progresso',
  concluida: 'Concluída',
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  urgente: 0,
  importante: 1,
  normal: 2,
};
