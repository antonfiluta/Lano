import { Component, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { TaskStore } from '@core/stores/task.store';
import { BoardStore } from '@core/stores/board.store';

@Component({
  selector: 'app-board-layout',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    SelectModule,
    ColorPickerModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [ConfirmationService, MessageService, RouterLink],
  templateUrl: './board-layout.html',
  styleUrls: ['./board-layout.css'],
})
export class BoardLayout {
  public boardId = input.required<string>();

  private taskStore = inject(TaskStore);
  private boardStore = inject(BoardStore);

  protected board = this.taskStore.activeBoard;
  protected tasks = this.taskStore.tasks;

  constructor() {
    effect(() => {
      this.taskStore.loadTasks(this.boardId());
    });
  }

  deleteBoard() {
    this.boardStore.deleteBoard(this.boardId());
    // this.confirmationService.confirm({
    //   message: `Are you sure you want to delete "${board.title}"?`,
    //   header: 'Delete Board',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.boardStore.deleteBoard(board.id);
    //   },
    // });
  }

  icons = [
    { label: 'List', value: 'list' },
    { label: 'Grid', value: 'th-large' },
    { label: 'Book', value: 'book' },
    { label: 'Calendar', value: 'calendar' },
    { label: 'Clock', value: 'clock' },
    { label: 'Heart', value: 'heart' },
    { label: 'Star', value: 'star' },
    { label: 'Briefcase', value: 'briefcase' },
    { label: 'User', value: 'user' },
    { label: 'Cog', value: 'cog' },
    { label: 'Folder', value: 'folder' },
    { label: 'File', value: 'file' },
  ];
  backgrounds = [
    { label: 'Blue Indigo', value: 'from-blue-500 to-indigo-600' },
    { label: 'Emerald Teal', value: 'from-emerald-500 to-teal-600' },
    { label: 'Violet Purple', value: 'from-violet-500 to-purple-600' },
    { label: 'Rose Pink', value: 'from-rose-500 to-pink-600' },
    { label: 'Amber Orange', value: 'from-amber-500 to-orange-600' },
    { label: 'Cyan Sky', value: 'from-cyan-500 to-sky-600' },
    { label: 'Gray Slate', value: 'from-gray-500 to-slate-600' },
  ];
}
