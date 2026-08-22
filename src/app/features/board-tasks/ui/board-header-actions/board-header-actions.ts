import { Component, input } from '@angular/core';
import { PrimeButton } from '@shared/ui/prime-button/prime-button';

@Component({
  selector: 'app-board-header-actions',
  imports: [PrimeButton],
  templateUrl: './board-header-actions.html',
  styleUrl: './board-header-actions.css',
})
export class BoardHeaderActions {
  public readonly boardId = input.required<string>();

  protected actionButtons = [
    { icon: 'sliders-h', label: 'Filter' },
    { icon: 'sort-alpha-down', label: 'Sort' },
    { icon: 'search', label: 'Search' },
  ];
}
