import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavSerice } from '@core/layouts/main-layout/services/nav.service';
import { SidebarService } from '@core/layouts/main-layout/services/sidebar.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-nav.html',
  styleUrl: './app-nav.css',
})
export class AppNav {
  private sidebar = inject(SidebarService);
  private nav = inject(NavSerice);

  protected isOpen = this.sidebar.isOpen;
  protected routes = this.nav.routes;
  protected bgPosition = this.nav.bgPosition;
  protected isBgAnimated = this.nav.isBgAnimated;
}
