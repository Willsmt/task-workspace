import styled from 'styled-components';
import { IconSearch, IconBell, IconChevronDown } from '@/components/icons';
import { IconButton } from '@/components/ui/IconButton';
import { Avatar } from '@/components/ui/Avatar';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { setSearch, toggleSidebar } from '@/features/ui/uiSlice';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  height: ${({ theme }) => theme.layout.topbarHeight};
  padding: 0 ${({ theme }) => theme.space.lg};
  background: rgba(19, 19, 19, 0.72);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    padding: 0 ${({ theme }) => theme.space.sm};
  }
`;

const Burger = styled(IconButton)`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    display: inline-flex;
  }
`;

const Search = styled.div`
  position: relative;
  flex: 1;
  max-width: 460px;

  svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.onSurfaceFaint};
  }

  input {
    width: 100%;
    height: 40px;
    padding: 0 14px 0 42px;
    background: ${({ theme }) => theme.colors.surfaceContainerLow};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius.md};
    color: ${({ theme }) => theme.colors.onSurface};
    font-size: 14px;
    transition: border-color ${({ theme }) => theme.transition.base};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin-left: auto;
`;

const NotifBtn = styled(IconButton)`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 9px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 6px ${({ theme }) => theme.colors.primary};
  }
`;

const ProfilePill = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 8px 0 6px;
  background: ${({ theme }) => theme.colors.surfaceContainerLow};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  color: ${({ theme }) => theme.colors.onSurface};
  font-size: 13px;
  font-weight: 500;
  transition: border-color ${({ theme }) => theme.transition.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  span {
    @media (max-width: ${({ theme }) => theme.breakpoint.mobile}px) {
      display: none;
    }
  }
`;

const Menu = styled(IconButton)`
  display: inline-flex;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    display: none;
  }
`;

export function Topbar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector((s) => s.ui.search);
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const user = useAppSelector((s) => s.user.current);
  const userName = user?.name ?? 'Usuário';

  return (
    <Bar>
      <Burger
        type="button"
        aria-label="Abrir menu"
        aria-expanded={sidebarOpen}
        onClick={() => dispatch(toggleSidebar())}
      >
        <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>
          ☰
        </span>
      </Burger>

      <Search>
        <IconSearch />
        <input
          type="search"
          placeholder="Buscar tarefas, notas ou projetos…"
          value={search}
          aria-label="Busca global"
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />
      </Search>

      <Right>
        <NotifBtn type="button" aria-label="Notificações">
          <IconBell />
        </NotifBtn>
        <ProfilePill type="button">
          <Avatar name={userName} src={user?.avatar} size={28} />
          <span>{userName}</span>
          <Menu as="span" $size={20} aria-hidden>
            <IconChevronDown width={14} height={14} />
          </Menu>
        </ProfilePill>
      </Right>
    </Bar>
  );
}
