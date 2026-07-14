import { Component, inject, signal } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';
import { RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { LoginData } from '@features/auth/models/user.model';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

const loginModel = signal<LoginData>({
  email: '',
  password: '',
});

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    FormField,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public store = inject(AuthStore);

  public loginForm = form(loginModel);

  public async submit() {
    const email = this.loginForm.email().value();
    const password = this.loginForm.password().value();

    await this.store.login({ email, password });
  }
}
