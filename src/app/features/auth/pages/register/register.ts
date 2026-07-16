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
import { RegisterData } from '@features/auth/models/user.model';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ButtonModule } from 'primeng/button';
import { Logo } from '@shared/ui/logo/logo';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

const registerModel = {
  email: '',
  name: '',
  password: '',
};

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormField,
    ConfirmPopupModule,
    ButtonModule,
    Logo,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private confirmationService = inject(ConfirmationService);
  public store = inject(AuthStore);

  public showPassword = signal(false);

  public registerForm = form(
    signal<RegisterData>(registerModel),
    (schemaPath) => {
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, {
        message: 'Please enter a valid email address',
      });

      required(schemaPath.name, { message: 'Name is required' });
      minLength(schemaPath.name, 2, {
        message: 'Name must be at least 2 characters',
      });

      required(schemaPath.password, { message: 'Password is required' });
      minLength(schemaPath.password, 6, {
        message: 'Password must be at least 6 characters',
      });
    },
  );

  public togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }

  public async submit(event: Event) {
    event.preventDefault();

    const email = this.registerForm.email().value();
    const name = this.registerForm.name().value();
    const password = this.registerForm.password().value();

    await this.store.register({ email, name, password });
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
        this.registerForm().reset(registerModel);
      },
    });
  }
}
