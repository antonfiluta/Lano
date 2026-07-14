import { Component, inject } from '@angular/core';
import { ThemeSwitcher } from '@features/theme/ui/theme-switcher/theme-switcher';
import { ColorSwitcher } from '@features/theme/ui/color-switcher/color-switcher';
import { AuthStore } from '@core/stores/auth.store';

@Component({
  selector: 'app-header',
  imports: [ThemeSwitcher, ColorSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public store = inject(AuthStore);
}
