import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
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
      import('@features/auth/pages/register/register').then((m) => m.Register),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];
