import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';
import { ToastModule } from 'primeng/toast';
import { InitialPage } from '@shared/ui/initial-page/initial-page';
import { Background } from '@shared/ui/background/background';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ToastModule, InitialPage, Background, RouterOutlet],
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
