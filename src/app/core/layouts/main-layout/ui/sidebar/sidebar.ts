import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { Logo } from '@shared/ui/logo/logo';

@Component({
  selector: 'app-sidebar',
  imports: [Logo, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authStore = inject(AuthStore);

  protected boards = [
    {
      title: '',
    },
  ];

  protected async logout() {
    await this.authStore.logout();
  }

  protected routes = [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: 'th-large',
    },
    {
      path: '/boards/',
      title: 'Boards',
      icon: 'list',
    },
    {
      path: '/habits',
      title: 'Habit Log',
      icon: 'book',
    },
    {
      path: '/sleep',
      title: 'Sleep Log',
      icon: 'calendar',
    },
    {
      path: '/settings',
      title: 'Settings',
      icon: 'cog',
    },
  ];
}
