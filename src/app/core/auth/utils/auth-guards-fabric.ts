import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, firstValueFrom, take } from 'rxjs';

export const authGuardsFabric = (isPrivate: boolean): CanActivateFn => {
  return async () => {
    const authStore = inject(AuthStore);
    const router = inject(Router);

    await firstValueFrom(
      toObservable(authStore.isReady).pipe(
        filter((isReady) => isReady === true),
        take(1),
      ),
    );

    if (isPrivate && !authStore.isAuthenticated()) {
      return router.createUrlTree(['/auth/login']);
    }
    if (!isPrivate && authStore.isAuthenticated()) {
      return router.createUrlTree(['/dashboard']);
    }
    return true;
  };
};
