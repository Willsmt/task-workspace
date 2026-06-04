import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import {
  IconProjects,
  IconTasks,
  IconNotes,
  IconStats,
  IconPlus,
  IconSettings,
  IconLogout,
} from '@/components/icons';
import { focusRing } from '@/styles/mixins';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setNewTaskModal, toggleSidebar } from '@/features/ui/uiSlice';

const Aside = styled.aside<{ $open: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  flex-shrink: 0;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.sm};
  background: #18181b;
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    position: fixed;
    z-index: 90;
    transform: translateX(${({ $open }) => ($open ? '0' : '-110%')});
    transition: transform ${({ theme }) => theme.transition.base};
    box-shadow: ${({ theme }) => theme.shadow.popover};
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 8px 0;
  margin-bottom: ${({ theme }) => theme.space.lg};

  strong {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.heading};
  }
  span {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  svg {
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
    transition: color ${({ theme }) => theme.transition.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.onSurface};
    background: ${({ theme }) => theme.tint.neutralBg};
  }

  &.active {
    color: ${({ theme }) => theme.colors.onSurface};
    background: ${({ theme }) => theme.tint.neutralBg};
    box-shadow: inset 2px 0 0 ${({ theme }) => theme.colors.primary};

    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Cta = styled.div`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const Spacer = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: ${({ theme }) => theme.space.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;

  div {
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  strong {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.onSurface};
  }
  span {
    font-size: 11px;
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }
`;

const MiniItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.onSurfaceVariant};
  transition: all ${({ theme }) => theme.transition.fast};
  ${focusRing};

  &:hover {
    color: ${({ theme }) => theme.colors.onSurface};
    background: ${({ theme }) => theme.tint.neutralBg};
  }
`;

const NAV = [
  { to: '/projetos', label: 'Projetos', icon: <IconProjects /> },
  { to: '/tarefas', label: 'Tarefas', icon: <IconTasks /> },
  { to: '/notas', label: 'Notas', icon: <IconNotes /> },
  { to: '/estatisticas', label: 'Estatísticas', icon: <IconStats /> },
];

export interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user.current);
  return (
    <Aside $open={open} aria-label="Navegação principal">
      <Brand>
        <strong>Task Note</strong>
        <span>Workspace de Precisão</span>
      </Brand>

      <Nav>
        {NAV.map((item) => (
          <Item key={item.to} to={item.to} onClick={() => dispatch(toggleSidebar(false))}>
            {item.icon}
            {item.label}
          </Item>
        ))}
      </Nav>

      <Cta>
        <Button $full $variant="primary" onClick={() => dispatch(setNewTaskModal(true))}>
          <IconPlus width={16} height={16} />
          Criar Nova Tarefa
        </Button>
      </Cta>

      <Spacer />

      <Footer>
        <Profile>
          <Avatar name={user?.name ?? 'Usuário'} src={user?.avatar} size={36} />
          <div>
            <strong>{user?.name ?? 'Usuário'}</strong>
            <span>{user?.role ?? '—'}</span>
          </div>
        </Profile>
        <MiniItem type="button">
          <IconSettings width={16} height={16} />
          Configurações
        </MiniItem>
        <MiniItem type="button">
          <IconLogout width={16} height={16} />
          Sair
        </MiniItem>
      </Footer>
    </Aside>
  );
}
