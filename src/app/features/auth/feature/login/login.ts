import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';
import { RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { LoginData } from '@features/auth/models/user.model';

const loginModel = signal<LoginData>({
  email: '',
  password: '',
});

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public store = inject(AuthStore);
  public loginForm = form(loginModel);

  public submit() {
    const email = this.loginForm.email().value();
    const password = this.loginForm.password().value();

    this.store.login({ email, password });
  }
}
