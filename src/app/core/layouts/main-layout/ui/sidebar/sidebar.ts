import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStore } from '@core/stores/auth.store';
import { Logo } from '@shared/ui/logo/logo';
import { LucideDynamicIcon } from '@lucide/angular';
import { LucidePanelLeftClose, LucidePanelLeftOpen } from '@lucide/angular';
import { SidebarService } from '@core/layouts/main-layout/services/sidebar.service';
import { CommonModule } from '@angular/common';
import { NavSerice } from '../../services/nav.service';
import { BoardStore } from '@core/stores/board.store';

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
  private boardStore = inject(BoardStore);
  private sidebar = inject(SidebarService);
  private nav = inject(NavSerice);

  protected boardsExpanded = signal<boolean>(true);
  protected boards = this.boardStore.boards;

  protected isOpen = this.sidebar.isOpen;
  protected isMobile = this.sidebar.isMobile;

  protected routes = this.nav.routes;
  protected bgPosition = this.nav.bgPosition;
  protected isBgAnimated = this.nav.isBgAnimated;

  protected icon = computed(() =>
    this.isOpen() ? LucidePanelLeftClose : LucidePanelLeftOpen,
  );

  protected toggleBoardsCollapse = () => this.boardsExpanded.update((v) => !v);
  protected toggleSidebar = () => this.sidebar.toggle();
  protected logout = () => this.authStore.logout();
}
