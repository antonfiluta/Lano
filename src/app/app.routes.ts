import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('@core/layouts/auth-layout/auth-layout').then((m) => m.AuthLayout),
    loadChildren: () =>
      import('@core/layouts/auth-layout/auth.routes').then(
        (m) => m.AUTH_ROUTES,
      ),
    canActivate: [authGuard(false)],
  },
  {
    path: '',
    loadComponent: () =>
      import('@core/layouts/main-layout/main-layout').then((m) => m.MainLayout),
    loadChildren: () =>
      import('@core/layouts/main-layout/main.routes').then(
        (m) => m.MAIN_ROUTES,
      ),
    canActivate: [authGuard(true)],
  },
  {
    path: 'not-found',
    title: 'Not Found',
    loadComponent: () =>
      import('@features/not-found/pages/not-found/not-found').then(
        (m) => m.NotFound,
      ),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
