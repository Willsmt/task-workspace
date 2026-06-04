import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { NewTaskModal } from '@/features/tasks/NewTaskModal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { toggleSidebar } from '@/features/ui/uiSlice';
import { customScrollbar } from '@/styles/mixins';

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.xl};
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  ${customScrollbar};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.sm};
  }
`;

const Backdrop = styled.button<{ $show: boolean }>`
  display: none;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet - 1}px) {
    display: ${({ $show }) => ($show ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 80;
    border: none;
    background: ${({ theme }) => theme.colors.overlay};
    backdrop-filter: blur(2px);
  }
`;

export function AppLayout() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);

  return (
    <Shell>
      <Sidebar open={sidebarOpen} />
      <Backdrop
        $show={sidebarOpen}
        aria-label="Fechar menu"
        onClick={() => dispatch(toggleSidebar(false))}
      />
      <Main>
        <Topbar />
        <Content>
          <Outlet />
        </Content>
      </Main>
      <NewTaskModal />
    </Shell>
  );
}
