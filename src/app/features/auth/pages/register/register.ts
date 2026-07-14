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
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Search } from '@primeicons/angular/search';
import { Times } from '@primeicons/angular/times';

const registerModel = signal<RegisterData>({
  email: '',
  name: '',
  password: '',
});

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormField,
    ConfirmPopupModule,
    ButtonModule,
    Logo,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    Search,
    Times,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public store = inject(AuthStore);

  public registerForm = form(registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email is required' });
    email(schemaPath.email, { message: 'Please enter a valid email address' });

    required(schemaPath.name, { message: 'Name is required' });
    minLength(schemaPath.name, 2, {
      message: 'Name must be at least 2 characters',
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

  public async submit() {
    const email = this.registerForm.email().value();
    const name = this.registerForm.name().value();
    const password = this.registerForm.password().value();

    await this.store.register({ email, name, password });
  }

  public clearForm() {
    // this.confirmationService.confirm({
    //   target: event.target as EventTarget,
    //   message: 'Are you sure you want to clear all fields?',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     // Reset form model to initial empty state
    //     registerModel.set({
    //       email: '',
    //       name: '',
    //       password: '',
    //     });
    //     // Reset touched/dirty states
    //     this.registerForm().reset();
    //   },
    //   reject: () => {
    //     // Do nothing
    //   },
    // });
  }
}
