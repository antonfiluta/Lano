import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  public authStore = inject(AuthStore);
  public router = inject(Router);

  public logout = async () => {
    if (await this.authStore.logout()) {
      this.router.navigateByUrl('/auth');
    }
  };
}
