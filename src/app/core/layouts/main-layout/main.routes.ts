import { Routes } from '@angular/router';
import { MainLayout } from './pages/main-layout/main-layout';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('@features/dashboard/pages/dashboard/dashboard').then(
            (m) => m.Dashboard,
          ),
      },
      {
        path: 'boards',
        title: 'Tasks Log',
        loadComponent: () =>
          import('@features/boards-overview/pages/boards-overview/boards-overview').then(
            (m) => m.BoardsOverview,
          ),
      },
      {
        path: 'boards/:id',
        title: 'Task Board',
        loadChildren: () =>
          import('@features/boards-overview/board.routes').then(
            (m) => m.BOARD_ROUTES,
          ),
      },
      {
        path: 'habits',
        title: 'Habits Log',
        loadComponent: () =>
          import('@features/habits/pages/habits-log/habits-log').then(
            (m) => m.HabitsLog,
          ),
      },
      {
        path: 'sleep',
        title: 'Sleep Log',
        loadComponent: () =>
          import('@features/sleep/pages/sleep-log/sleep-log').then(
            (m) => m.SleepLog,
          ),
      },
      {
        path: 'settings',
        title: 'Lano Settings',
        loadComponent: () =>
          import('@features/settings/pages/settings/settings').then(
            (m) => m.Settings,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
  },
];
