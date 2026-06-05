import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { routes } from './app.routes';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    providePrimeNG({
      ripple: true,
      inputVariant: 'outlined',
      overlayAppendTo: 'body',
      theme: {
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
          darkModeSelector: '.my-app-dark',
        },
      },
    }),
    provideAppInitializer(() => {
      const authStore = inject(AuthStore);
      return authStore.initialize();
    }),
  ],
};
