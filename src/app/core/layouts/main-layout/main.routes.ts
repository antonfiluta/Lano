import { Routes } from '@angular/router';

export const MAIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('@features/dashboard/pages/dashboard/dashboard').then(
        (m) => m.Dashboard,
      ),
  },
  {
    path: 'board',
    title: 'Board',
    loadChildren: () =>
      import('@features/board/board.routes').then((m) => m.BOARD_ROUTES),
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
];
