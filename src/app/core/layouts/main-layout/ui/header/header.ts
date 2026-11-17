import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '@core/stores/auth.store';
import { LucideDynamicIcon } from '@lucide/angular';
import { LucidePanelLeftClose, LucidePanelLeftOpen } from '@lucide/angular';
import { SidebarService } from '@core/layouts/main-layout/services/sidebar.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [LucideDynamicIcon, ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected store = inject(AuthStore);
  protected sidebar = inject(SidebarService);

  protected icon = computed(() =>
    this.sidebar.isOpen() ? LucidePanelLeftClose : LucidePanelLeftOpen,
  );
}
