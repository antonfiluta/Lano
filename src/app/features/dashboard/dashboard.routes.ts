import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    title: 'Lano Dashboard',
    loadComponent: () => import('./feature/dashboard/dashboard').then((m) => m.Dashboard),
  },
];
