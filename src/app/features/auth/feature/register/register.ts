import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';
import { RegisterData } from '@features/auth/models/user.model';

const registerModel = signal<RegisterData>({
  email: '',
  name: '',
  password: '',
});

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public store = inject(AuthStore);
  public registerForm = form(registerModel);

  public submit() {
    const email = this.registerForm.email().value();
    const name = this.registerForm.name().value();
    const password = this.registerForm.password().value();

    this.store.register({ email, name, password });
  }
}
