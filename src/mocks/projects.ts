import type { Project } from '@/types/domain';
import { DAY, type IsoFromOffset } from './time';

/** Projetos simulados (base da tela de Projetos & Timeline). */
export const mockProjects = (iso: IsoFromOffset): Project[] => [
  {
    id: 'proj_redux',
    name: 'Arquitetura Redux Store',
    priority: 'urgente',
    progress: 64,
    startDate: iso(-6 * DAY),
    endDate: iso(2 * DAY),
  },
  {
    id: 'proj_timer',
    name: 'Lógica do Timer em Python',
    priority: 'importante',
    progress: 38,
    startDate: iso(-2 * DAY),
    endDate: iso(9 * DAY),
  },
  {
    id: 'proj_auth',
    name: 'Gateway de Autenticação',
    priority: 'normal',
    progress: 12,
    startDate: iso(1 * DAY),
    endDate: iso(16 * DAY),
  },
];
