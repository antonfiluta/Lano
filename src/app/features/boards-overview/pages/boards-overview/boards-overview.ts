import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BoardStore } from '@core/stores/board.store';
import { STAT_CARDS } from '@features/boards-overview/utils/board.constants';
import { SkeletonModule } from 'primeng/skeleton';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule, RouterLink, SkeletonModule, ReactiveFormsModule],
  templateUrl: './boards-overview.html',
  styleUrls: ['./boards-overview.css'],
})
export class BoardsOverview implements OnInit {
  private boardStore = inject(BoardStore);
  private destroyRef = inject(DestroyRef);

  protected searchControl = new FormControl('');

  protected statValues = this.boardStore.stats;
  protected filteredBoards = this.boardStore.filteredBoards;
  protected isStoreLoading = this.boardStore.isLoading;

  protected statCards = STAT_CARDS;

  protected addBoard(): void {
    this.boardStore.addBoard();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => {
        this.boardStore.searchBoard(term || '');
      });
  }
}
