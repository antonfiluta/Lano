import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  public store = inject(AuthStore);

  public registerForm = form(registerModel);

  public async submit() {
    const email = this.registerForm.email().value();
    const name = this.registerForm.name().value();
    const password = this.registerForm.password().value();

    if (await this.store.register({ email, name, password })) {
      this.router.navigateByUrl('');
    }
  }
}
