import { Component, inject } from '@angular/core';
import { ThemeSwitcher } from '@features/theme/ui/theme-switcher/theme-switcher';
import { ColorSwitcher } from '@features/theme/ui/color-switcher/color-switcher';
import { AuthStore } from '@core/stores/auth.store';
import { LucidePanelLeftClose } from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [ThemeSwitcher, ColorSwitcher, LucidePanelLeftClose],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly store = inject(AuthStore);
}
