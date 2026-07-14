import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom, take } from 'rxjs';
import { RedirectService } from '@features/auth/services/redirect';

export const authGuard = (isForAuthenticated: boolean): CanActivateFn => {
  return async () => {
    const authStore = inject(AuthStore);
    const redirectService = inject(RedirectService);

    await firstValueFrom(
      toObservable(authStore.initialized).pipe(
        filter((initialized) => initialized === true),
        take(1),
      ),
    );

    if (isForAuthenticated !== authStore.isAuthenticated()) {
      return redirectService.redirectUser(isForAuthenticated);
    }

    return true;
  };
};
