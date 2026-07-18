import { Component, computed, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-auth-wrapper',
  imports: [Logo],
  templateUrl: './auth-wrapper.html',
  styleUrl: './auth-wrapper.css',
})
export class AuthWrapper {
  public isLogin = input<boolean>(true);

  private router = inject(Router);

  protected authContent = computed(() =>
    this.isLogin()
      ? {
          header: 'Sign in to your account',
          footer: 'Don’t have an account?',
          link: 'Create new',
        }
      : {
          header: 'Create your account',
          footer: 'Already have an account?',
          link: 'Sign in',
        },
  );

  public safeNavigate() {
    const target = this.isLogin() ? 'register' : 'login';

    this.router.navigate(['/auth', target], {
      queryParamsHandling: 'preserve',
    });
  }
}
