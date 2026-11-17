import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@core/layouts/main-layout/main.routes').then(
        (m) => m.MAIN_ROUTES,
      ),
    canActivate: [authGuard],
    data: { requireAuth: true },
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@core/layouts/auth-layout/auth.routes').then(
        (m) => m.AUTH_ROUTES,
      ),
    canActivate: [authGuard],
    data: { requireAuth: false },
  },
  {
    path: 'not-found',
    title: 'Not Found',
    loadComponent: () =>
      import('@features/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
