import { Component, inject } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authStore = inject(AuthStore);

  public async logout() {
    await this.authStore.logout();
  }
}
