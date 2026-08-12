import { Component, inject } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';
import { Logo } from '@shared/ui/logo/logo';
import { SidebarService } from '@core/layouts/main-layout/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { AppNav } from '../sidebar-ui/app-nav/app-nav';
import { BoardNav } from '../sidebar-ui/board-nav/board-nav';
import { Divider } from '@shared/ui/divider/divider';

@Component({
  selector: 'app-sidebar',
  imports: [Logo, CommonModule, AppNav, BoardNav, Divider],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authStore = inject(AuthStore);
  private sidebar = inject(SidebarService);

  protected isOpen = this.sidebar.isOpen;

  protected logout = () => this.authStore.logout();
}
