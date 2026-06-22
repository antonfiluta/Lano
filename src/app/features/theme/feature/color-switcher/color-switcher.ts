import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { themeStore } from '@features/theme/data-access/theme.store';
import { PrimaryColor, SurfaceColor } from '@features/theme/models/theme.model';
import {
  PRIMARY_COLORS,
  SURFACE_COLORS,
  SURFACE_PALETTES,
} from '@features/theme/utils/theme.constants';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-color-switcher',
  imports: [CommonModule, ButtonModule, StyleClassModule],
  templateUrl: './color-switcher.html',
  styleUrl: './color-switcher.css',
})
export class ColorSwitcher {
  public readonly store = inject(themeStore);

  public readonly primaryColors = PRIMARY_COLORS;
  public readonly surfaceColors = SURFACE_COLORS;
  public readonly surfacePalettes = SURFACE_PALETTES;

  public setPrimary(color: PrimaryColor) {
    this.store.setPrimary(color);
  }
  public setSurface(color: SurfaceColor) {
    this.store.setSurface(color);
  }
}
