import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BoardStore } from '@core/stores/board.store';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private boardStore = inject(BoardStore);

  date = new Date();

  protected boards = this.boardStore.boards;
  protected stats = this.boardStore.stats;

  quickActions = [
    { label: 'New Board', icon: 'pi-plus', link: '/boards' },
    { label: 'Statistics', icon: 'pi-chart-bar', link: '/statistics' },
    { label: 'Profile', icon: 'pi-user', link: '/settings' },
  ];
}
