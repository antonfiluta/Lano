import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BoardStore } from '@core/stores/board.store';

@Component({
  selector: 'app-board-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './boards-overview.html',
  styleUrls: ['./boards-overview.css'],
})
export class BoardsOverview {
  private boardStore = inject(BoardStore);

  protected testStats = this.boardStore.statCards;

  stats = [
    {
      label: 'Total Tasks',
      value: 48,
      icon: 'pi-list',
      color: 'text-primary-500',
    },
    {
      label: 'In Progress',
      value: 12,
      icon: 'pi-spinner',
      color: 'text-amber-500',
    },
    {
      label: 'Completed',
      value: 28,
      icon: 'pi-check-circle',
      color: 'text-emerald-500',
    },
    {
      label: 'Overdue',
      value: 8,
      icon: 'pi-exclamation-circle',
      color: 'text-red-500',
    },
  ];

  // boards = signal([
  //   {
  //     id: 1,
  //     name: 'Personal',
  //     icon: 'pi-user',
  //     color: 'from-blue-500 to-indigo-600',
  //     tasks: 8,
  //     progress: 60,
  //   },
  //   {
  //     id: 2,
  //     name: 'Work',
  //     icon: 'pi-briefcase',
  //     color: 'from-emerald-500 to-teal-600',
  //     tasks: 14,
  //     progress: 45,
  //   },
  //   {
  //     id: 3,
  //     name: 'Study',
  //     icon: 'pi-book',
  //     color: 'from-violet-500 to-purple-600',
  //     tasks: 6,
  //     progress: 80,
  //   },
  //   {
  //     id: 4,
  //     name: 'Health',
  //     icon: 'pi-heart',
  //     color: 'from-rose-500 to-pink-600',
  //     tasks: 5,
  //     progress: 30,
  //   },
  //   {
  //     id: 5,
  //     name: 'Side Project',
  //     icon: 'pi-rocket',
  //     color: 'from-orange-500 to-amber-600',
  //     tasks: 10,
  //     progress: 20,
  //   },
  // ]);

  searchQuery = signal('');

  protected filteredBoards = computed(() => {
    const query = this.searchQuery().toLowerCase();

    const some = this.boardStore.stats();
    console.log(some);

    if (!some) return [];

    const boards = some.boards;
    console.log(boards);

    if (!boards) return [];

    return boards.filter((board) => board.title.toLowerCase().includes(query));
  });

  addBoard() {
    console.log('Add board');
  }
}
