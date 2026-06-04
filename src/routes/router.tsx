import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { TasksNotesPage } from '@/pages/TasksNotesPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projetos', element: <ProjectsPage /> },
      { path: 'tarefas', element: <TasksNotesPage /> },
      { path: 'notas', element: <TasksNotesPage /> },
      { path: 'estatisticas', element: <AnalyticsPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
