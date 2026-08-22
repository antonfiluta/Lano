import { Component, inject, input, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStore } from '@core/stores/task.store';
import { RouterOutlet } from '@angular/router';
import { BoardHeader } from '@features/board-tasks/ui/board-header/board-header';
import { BoardStore } from '@core/stores/board.store';

@Component({
  selector: 'app-board-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BoardHeader],
  templateUrl: './board-layout.html',
  styleUrls: ['./board-layout.css'],
})
export class BoardLayout {
  public readonly boardId = input.required<string>();

  private taskStore = inject(TaskStore);
  private boardStore = inject(BoardStore);

  protected board = computed(() =>
    this.boardStore.boards().find((board) => board.id === this.boardId()),
  );

  constructor() {
    effect(() => {
      this.taskStore.loadTasks(this.boardId());
    });
  }
}
