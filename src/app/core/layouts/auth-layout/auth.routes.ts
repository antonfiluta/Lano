import { Routes } from '@angular/router';
import { AuthLayout } from './pages/auth-layout/auth-layout';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        title: 'Lano Login',
        loadComponent: () =>
          import('@features/auth/pages/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        title: 'Lano Register',
        loadComponent: () =>
          import('@features/auth/pages/register/register').then(
            (m) => m.Register,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
    ],
  },
];
