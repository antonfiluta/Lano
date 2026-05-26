import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    title: 'Lano Settings',
    loadComponent: () => import('./feature/settings/settings').then((m) => m.Settings),
  },
];
