import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BOARD_VIEWS } from '@features/board-tasks/utils/board-layout.constants';

@Component({
  selector: 'app-board-header-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board-header-nav.html',
  styleUrl: './board-header-nav.css',
})
export class BoardHeaderNav {
  public readonly boardId = input.required<string>();
  protected boardViews = BOARD_VIEWS;
}
