import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { Logo } from '@shared/ui/logo/logo';
import { LucideDynamicIcon } from '@lucide/angular';
import { LucidePanelLeftClose, LucidePanelLeftOpen } from '@lucide/angular';
import { SidebarService } from '@core/layouts/main-layout/serivces/sidebar.service';
import { CommonModule } from '@angular/common';
import { NavSerice } from '../../serivces/nav.service';

@Component({
  selector: 'app-sidebar',
  imports: [
    Logo,
    RouterLink,
    RouterLinkActive,
    LucideDynamicIcon,
    CommonModule,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private authStore = inject(AuthStore);
  private sidebar = inject(SidebarService);
  private nav = inject(NavSerice);

  protected isOpen = this.sidebar.isOpen;
  protected isMobile = this.sidebar.isMobile;

  protected routes = this.nav.routes;
  protected boards = this.nav.boards;
  protected bgPosition = this.nav.bgPosition;
  protected isBgAnimated = this.nav.isBgAnimated;

  protected icon = computed(() =>
    this.isOpen() ? LucidePanelLeftClose : LucidePanelLeftOpen,
  );

  protected toggle = () => this.sidebar.toggle();
  protected logout = () => this.authStore.logout();
}
