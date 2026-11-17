import { Component, inject, input } from '@angular/core';
import { TaskStore } from '@core/stores/task.store';
import {
  SortOptions,
  SortType,
} from '@features/board-tasks/models/tasks.models';
import { PrimeButton } from '@shared/ui/prime-button/prime-button';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-board-header-actions',
  imports: [PrimeButton, PopoverModule],
  templateUrl: './board-header-actions.html',
  styleUrl: './board-header-actions.css',
})
export class BoardHeaderActions {
  public readonly boardId = input.required<string>();

  private taskStore = inject(TaskStore);

  protected sortOption = this.taskStore.sortBy;
  protected sortType = this.taskStore.sortType;

  readonly sortOptions: { value: SortOptions; label: string; icon: string }[] =
    [
      { value: 'position', label: 'Position', icon: 'pi-hashtag' },
      { value: 'dueDate', label: 'Due date', icon: 'pi-calendar' },
      { value: 'priority', label: 'Priority', icon: 'pi-flag' },
      { value: 'status', label: 'Status', icon: 'pi-tag' },
      { value: 'title', label: 'Title', icon: 'pi-align-left' },
    ];

  readonly sortTypes: { value: SortType; label: string; icon: string }[] = [
    { value: 'asc', label: 'Asc', icon: 'pi-sort-amount-up' },
    { value: 'desc', label: 'Desc', icon: 'pi-sort-amount-down' },
  ];

  setSort(option: SortOptions): void {
    this.taskStore.setSortOption(option);
  }

  setType(type: SortType): void {
    this.taskStore.setSortType(type);
  }
}
