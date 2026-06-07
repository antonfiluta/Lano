import { Component, inject } from '@angular/core';
import { themeStore } from '@features/theme/data-access/theme.store';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  private themeService = inject(themeStore);
}
