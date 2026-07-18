import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { ToastModule } from 'primeng/toast';
import { InitialPage } from '@shared/ui/initial-page/initial-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, InitialPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected authStore = inject(AuthStore);

  protected canActivate = signal(false);

  ngOnInit() {
    setTimeout(() => this.canActivate.set(true), 2000);
  }
}
