import { Component } from '@angular/core';
import { ThemeSwitcher } from '@features/theme/ui/theme-switcher/theme-switcher';
import { ColorSwitcher } from '@features/theme/ui/color-switcher/color-switcher';

@Component({
  selector: 'app-background',
  imports: [ThemeSwitcher, ColorSwitcher],
  templateUrl: './background.html',
  styleUrl: './background.css',
})
export class Background {}
