import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth-guard/auth-guard';
import { authRedirectGuard } from '@core/auth/guards/auth-redirect/auth-redirect-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('@core/layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
    canActivate: [authRedirectGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('@core/layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@features/dashboard/dashboard.routes').then(
            (m) => m.DASHBOARD_ROUTES,
          ),
      },
      {
        path: 'board',
        loadChildren: () =>
          import('@features/board/board.routes').then((m) => m.BOARD_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('@features/settings/settings.routes').then(
            (m) => m.SETTINGS_ROUTES,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
    ],
    canActivate: [authGuard],
  },
  {
    path: 'not-found',
    title: 'Not Found',
    loadComponent: () =>
      import('@features/not-found/feature/not-found/not-found').then(
        (m) => m.NotFound,
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
