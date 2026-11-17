import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SidebarService } from '@core/layouts/main-layout/services/sidebar.service';
import { BoardStore } from '@core/stores/board.store';

@Component({
  selector: 'app-board-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './board-nav.html',
  styleUrl: './board-nav.css',
})
export class BoardNav {
  private boardStore = inject(BoardStore);
  private sidebar = inject(SidebarService);

  protected boardsExpanded = signal<boolean>(true);

  protected boards = this.boardStore.boards;
  protected isOpen = this.sidebar.isOpen;

  protected toggleBoardsCollapse = () => this.boardsExpanded.update((v) => !v);
}
