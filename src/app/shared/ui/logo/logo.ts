import { Component, computed, input } from '@angular/core';
import { LogoSizes } from '@shared/types/util.types';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  public size = input<LogoSizes>('md');
  public onlyIcon = input<boolean>(false);

  public styles = computed(() => {
    let iconSize, fontSize;

    switch (this.size()) {
      case 'xs':
        iconSize = 'size-8 rounded-md';
        fontSize = 'text-xl';
        break;
      case 'sm':
        iconSize = 'size-10 rounded-lg';
        fontSize = 'text-2xl';
        break;
      case 'md':
        iconSize = 'size-12 rounded-xl';
        fontSize = 'text-4xl';
        break;
      case 'lg':
        iconSize = 'size-14 rounded-xl';
        fontSize = 'text-5xl';
    }

    return {
      iconSize,
      fontSize,
    };
  });
}
