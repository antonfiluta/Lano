import { Component, computed, inject } from '@angular/core';
import { ThemeStore } from '@core/stores/theme.store';
import { ThemeMode } from '@features/theme/models/theme.model';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-switcher',
  imports: [ButtonModule],
  templateUrl: './theme-switcher.html',
  styleUrl: './theme-switcher.css',
})
export class ThemeSwitcher {
  private store = inject(ThemeStore);

  public modeIcon = computed(() => (this.store.isDark() ? 'moon' : 'sun'));

  public toggleDarkMode() {
    this.store.setMode(this.store.isDark() ? ThemeMode.Light : ThemeMode.Dark);
  }
}
