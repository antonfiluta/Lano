import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectService {
  private router = inject(Router);

  public redirectUser(isForAuthenticated: boolean) {
    if (isForAuthenticated) {
      const returnUrl = this.getReturnUrl();

      if (returnUrl && !returnUrl.startsWith('http')) {
        return this.router.navigateByUrl(returnUrl);
      }

      return this.router.navigate(['/dashboard']);
    } else {
      const currentUrl = this.router.url;
      return this.router.navigate(['/auth'], {
        queryParams: { returnUrl: currentUrl },
      });
    }
  }

  private getReturnUrl(): string | null {
    const route = this.router.routerState.root.snapshot;
    return route.queryParams['returnUrl'] || null;
  }
}

// при передаче параметров на register/login есть шанс что они типо потеряются
// дипсик предлагал такое решение:
// while (route.firstChild) {
//   route = route.firstChild;
// }
// Удалить когда настроть крос страничную переадресацию

// TODO защита редиректов через сверку домена как вариант
