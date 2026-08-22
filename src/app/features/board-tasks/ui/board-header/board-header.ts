import { Component, input } from '@angular/core';
import { BoardHeaderDetails } from '../board-header-details/board-header-details';
import { BoardHeaderOptions } from '../board-header-options/board-header-options';
import { BoardHeaderNav } from '../board-header-nav/board-header-nav';
import { BoardHeaderActions } from '../board-header-actions/board-header-actions';
import { BoardViewModel } from '@features/boards-overview/models/board.models';

@Component({
  selector: 'app-board-header',
  standalone: true,
  imports: [
    BoardHeaderDetails,
    BoardHeaderOptions,
    BoardHeaderNav,
    BoardHeaderActions,
  ],
  templateUrl: './board-header.html',
  styleUrl: './board-header.css',
})
export class BoardHeader {
  public readonly board = input.required<BoardViewModel>();
}
