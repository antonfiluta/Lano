import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);

  public redirectUser(isForAuthenticated: boolean) {
    if (isForAuthenticated) {
      const currentUrl = this.router.url;
      return this.router.navigate(['/auth'], {
        queryParams: { returnUrl: currentUrl },
      });
    } else {
      const returnUrl = this.getReturnUrl();

      if (returnUrl && !returnUrl.startsWith('http')) {
        return this.router.navigateByUrl(returnUrl);
      }

      return this.router.navigate(['/dashboard']);
    }
  }

  private getReturnUrl(): string | null {
    let route = this.router.routerState.root.snapshot;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.queryParams['returnUrl'] || null;
  }
}
