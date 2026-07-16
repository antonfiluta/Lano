import { Component, inject, signal } from '@angular/core';
import {
  form,
  FormField,
  required,
  email,
  minLength,
} from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { LoginData } from '@features/auth/models/user.model';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Logo } from '@shared/ui/logo/logo';

const loginModel = {
  email: '',
  password: '',
};

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormField, Logo, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private confirmationService = inject(ConfirmationService);
  public store = inject(AuthStore);

  public loginForm = form(signal<LoginData>(loginModel), (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, {
      message: 'Please enter a valid email address',
    });

    required(schemaPath.password, { message: 'Password is required' });
    minLength(schemaPath.password, 6, {
      message: 'Password must be at least 6 characters',
    });
  });

  public showPassword = signal(false);

  public togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }

  public async submit(event: Event) {
    event.preventDefault();

    const email = this.loginForm.email().value();
    const password = this.loginForm.password().value();

    await this.store.login({ email, password });
  }

  public clearForm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to clear form?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      dismissableMask: true,
      rejectButtonProps: { label: 'Cancel', severity: 'secondary' },
      acceptButtonProps: { label: 'Clear' },
      accept: () => {
        this.loginForm().reset(loginModel);
      },
    });
  }
}
