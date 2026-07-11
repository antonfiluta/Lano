import { Component, inject } from '@angular/core';
import { ThemeSwitcher } from '@features/theme/feature/theme-switcher/theme-switcher';
import { ColorSwitcher } from '@features/theme/feature/color-switcher/color-switcher';
import { AuthStore } from '@features/auth/data-access/auth.store/auth.store';

@Component({
  selector: 'app-header',
  imports: [ThemeSwitcher, ColorSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public store = inject(AuthStore);
}
