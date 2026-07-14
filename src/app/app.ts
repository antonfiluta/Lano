import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { ToastModule } from 'primeng/toast';
import { Background } from '@shared/ui/background/background';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, Background, Logo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected authStore = inject(AuthStore);
}
