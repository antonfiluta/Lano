import { Routes } from '@angular/router';

export const MAIN_ROUTES: Routes = [
  {
    path: 'dashboard',
    title: 'Lano Dashboard',
    loadComponent: () =>
      import('@features/dashboard/pages/dashboard/dashboard').then(
        (m) => m.Dashboard,
      ),
  },
  {
    path: 'board',
    title: 'Lano Board',
    loadChildren: () =>
      import('@features/board/board.routes').then((m) => m.BOARD_ROUTES),
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
