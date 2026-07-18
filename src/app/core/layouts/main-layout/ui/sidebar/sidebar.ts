import { Component, inject } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [Logo],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authStore = inject(AuthStore);

  public async logout() {
    await this.authStore.logout();
  }
}
