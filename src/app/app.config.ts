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
import Aura from '@primeuix/themes/aura';
import { themeStore } from '@features/theme/data-access/theme.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
    provideAppInitializer(() => {
      inject(AuthStore).initialize();
      inject(themeStore);
    }),
  ],
};
