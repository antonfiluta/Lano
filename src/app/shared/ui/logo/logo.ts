import { Component, computed, input } from '@angular/core';
import { LogoSizes } from '@shared/types/util.types';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  public size = input<LogoSizes>('medium');

  public styles = computed(() => {
    let iconSize, fontSize;

    switch (this.size()) {
      case 'small':
        iconSize = 'size-10 rounded-lg';
        fontSize = 'text-2xl';
        break;
      case 'medium':
        iconSize = 'size-12 rounded-xl';
        fontSize = 'text-4xl';
        break;
      case 'large':
        iconSize = 'size-14 rounded-xl';
        fontSize = 'text-5xl';
    }

    return {
      iconSize,
      fontSize,
    };
  });
}
