import type { Note } from '@/types/domain';
import { DAY, HOUR, type IsoFromOffset } from './time';

/** Notas simuladas, vinculadas às tarefas (editor estilo Obsidian). */
export const mockNotes = (iso: IsoFromOffset): Note[] => [
  {
    id: 'note_termo',
    taskId: 'task_revisar',
    title: 'Causa de conclusão e condições',
    updatedAt: iso(-2 * HOUR),
    tags: ['Project Phoenix', 'Limpeza de API'],
    content: [
      '## 1. Condições de Conclusão',
      '',
      'Antes do processo de refatoração, precisamos analisar a transição de status que governa o ciclo de vida da tarefa. Esta fase exige aderência estrita ao arquiteto-chefe.',
      '',
      '- Todas as subtarefas precisam de um booleano **TRUE**.',
      '- Assinaturas de metadados devem ser verificadas pelo lead.',
      '- O delta temporal entre início e fim não pode exceder 72 horas.',
      '',
      'Referência cruzada: [[Metas-Sprint-7]] para a arquitetura de base.',
      '',
      '> Nota Crítica: qualquer desvio do alvo dispara uma reavaliação automática do processo atual.',
      '',
      'Continuando a análise...',
    ].join('\n'),
  },
  {
    id: 'note_schema',
    taskId: 'task_schema',
    title: 'Notas do esquema de banco',
    updatedAt: iso(-1 * DAY),
    tags: ['Banco de Dados', 'Backend'],
    content: [
      '## Esquema de Dados',
      '',
      'Definir as tabelas principais e relações antes de iniciar as migrações.',
      '',
      '- Usuários, Tarefas, Notas e Projetos.',
      '- Índices em `dueDate` e `status`.',
    ].join('\n'),
  },
];
