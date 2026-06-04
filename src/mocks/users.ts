import type { User } from '@/types/domain';

/**
 * Usuário autenticado simulado (sem login real).
 * Toda a aplicação se comporta como se este usuário estivesse logado.
 */
export const mockCurrentUser: User = {
  id: '1',
  name: 'Willians Martins',
  role: 'Developer',
  avatar: '/avatar.svg',
};

/** Demais usuários mockados (ex.: responsáveis por tarefas/projetos). */
export const mockUsers: User[] = [
  mockCurrentUser,
  { id: '2', name: 'Ana Souza', role: 'Product Manager', avatar: null },
  { id: '3', name: 'Bruno Lima', role: 'Designer', avatar: null },
];
