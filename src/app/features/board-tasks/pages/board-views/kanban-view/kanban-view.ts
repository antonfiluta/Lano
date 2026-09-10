import { Component, effect, inject, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskStore } from '@core/stores/task.store';
import { KANBAN_COLS } from '@features/board-tasks/utils/board-layout.constants';
import {
  Task,
  TaskPriority,
  TaskStatus,
} from '@features/board-tasks/models/tasks.models';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-view',
  standalone: true,
  imports: [CommonModule, DatePipe, DragDropModule],
  templateUrl: './kanban-view.html',
  styleUrl: './kanban-view.css',
})
export class KanbanView {
  public readonly boardId = input.required<string>();

  private taskStore = inject(TaskStore);

  protected tasks = this.taskStore.kanbanTasks;
  protected cols = KANBAN_COLS;
  protected dropListIds = KANBAN_COLS.map((col) => col.type);

  constructor() {
    effect(() => {
      console.log('-----------------');
      console.log(String(this.tasks()['to-do'].map((item) => item.position)));
      console.log(
        String(this.tasks()['in-progress'].map((item) => item.position)),
      );
      console.log(
        String(this.tasks()['completed'].map((item) => item.position)),
      );
    });
  }

  protected onDrop(event: CdkDragDrop<Task[]>) {
    const newStatus = event.container.id as TaskStatus;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      const movedTask = event.container.data[event.currentIndex];
      movedTask.status = newStatus;
    }

    const task = event.item.data;
    const newIndex = event.currentIndex;

    const colTasks = event.container.data;
    const colLength = colTasks.length;

    let newPosition;
    let shouldNormalize = false;

    if (colLength === 0) {
      newPosition = 0;
    } else if (newIndex === 0) {
      newPosition = colTasks[1].position - 1;
    } else if (colLength === newIndex + 1) {
      newPosition = colTasks[newIndex - 1].position + 1;
    } else {
      newPosition =
        (colTasks[newIndex - 1].position + colTasks[newIndex + 1].position) / 2;

      if (String(newPosition).length > 15) shouldNormalize = true;
    }

    this.taskStore.moveTask(task.id, newStatus, newPosition).then(() => {
      if (shouldNormalize)
        this.taskStore.normalizePositions(
          this.boardId(),
          this.tasks()[newStatus],
        );
    });
  }

  protected formatStatus(status: TaskStatus): string {
    return status.replace(/-/g, ' ');
  }

  protected getColBg(status: TaskStatus): string {
    const map: Record<TaskStatus, string> = {
      'to-do':
        'bg-surface-0/60 dark:bg-surface-900/65 border-surface-200 dark:border-surface-800',
      'in-progress': 'bg-blue-400/5 border-blue-500/20',
      completed:
        'bg-surface-0/60 dark:bg-emerald-500/5 border-emerald-500 dark:border-emerald-800/20',
    };
    return map[status];
  }

  protected getStatusDot(status: TaskStatus): string {
    const map: Record<TaskStatus, string> = {
      'to-do': 'bg-surface-400 dark:bg-surface-500',
      'in-progress': 'bg-blue-500',
      completed: 'bg-emerald-500',
    };
    return map[status];
  }

  protected getPriorityStripe(priority: TaskPriority): string {
    const map: Record<TaskPriority, string> = {
      low: 'bg-surface-300 dark:bg-surface-600',
      medium: 'bg-amber-400',
      high: 'bg-rose-400',
    };
    return map[priority];
  }

  protected getPriorityText(priority: TaskPriority): string {
    const map: Record<TaskPriority, string> = {
      low: 'text-surface-400 dark:text-surface-500',
      medium: 'text-amber-600 dark:text-amber-400',
      high: 'text-rose-600 dark:text-rose-400',
    };
    return map[priority];
  }

  protected addTask(status: TaskStatus): void {
    const lastColTask = this.tasks()[status].at(-1);
    const position = lastColTask ? lastColTask.position + 1 : 0;

    this.taskStore.addTask(this.boardId(), { status, position });
  }

  protected deleteTask(taskId: string): void {
    this.taskStore.deleteTask(taskId);
  }

  protected openTask(task: Task): void {
    const taskArray = this.tasks()[task.status];

    this.taskStore.normalizePositions(this.boardId(), taskArray);
  }
}
