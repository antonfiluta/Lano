import {
  Component,
  inject,
  input,
  computed,
  signal,
  effect,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BoardStore } from '@core/stores/board.store';
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
import { Board } from '@features/boards-overview/models/board.models';
import { SelectModule } from 'primeng/select';
import { BoardView } from '@features/board-tasks/models/tasks.models';

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
  private boardStore = inject(BoardStore);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  id = input.required<string>();

  // Текущая доска
  currentBoard = computed(() =>
    this.boardStore.boards().find((b) => b.id === this.id()),
  );

  // Состояние для диалога редактирования
  editDialogVisible = signal(false);
  editBoard = signal<Partial<Board> | null>(null);

  // Доступные иконки для выбора
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

  // Доступные фоны (цвета/градиенты)
  backgrounds = [
    { label: 'Blue Indigo', value: 'from-blue-500 to-indigo-600' },
    { label: 'Emerald Teal', value: 'from-emerald-500 to-teal-600' },
    { label: 'Violet Purple', value: 'from-violet-500 to-purple-600' },
    { label: 'Rose Pink', value: 'from-rose-500 to-pink-600' },
    { label: 'Amber Orange', value: 'from-amber-500 to-orange-600' },
    { label: 'Cyan Sky', value: 'from-cyan-500 to-sky-600' },
    { label: 'Gray Slate', value: 'from-gray-500 to-slate-600' },
  ];

  // Текущий вид (по умолчанию kanban)
  currentView = signal<BoardView>('kanban');

  // При инициализации устанавливаем вид из URL
  constructor() {
    effect(() => {
      const url = this.router.url;
      const match = url.match(/\/board\/[^/]+\/([^/]+)/);
      if (match) {
        const view = match[1] as BoardView;
        if (['kanban', 'list', 'calendar', 'statistics'].includes(view)) {
          this.currentView.set(view);
        }
      }
    });
  }

  // Переключение вида
  changeView(view: BoardView) {
    this.currentView.set(view);
    this.router.navigate([`/board/${this.id()}/${view}`]);
  }

  // Открыть диалог редактирования
  openEditDialog() {
    const board = this.currentBoard();
    if (board) {
      this.editBoard.set({ ...board });
      this.editDialogVisible.set(true);
    }
  }

  // Сохранить изменения
  saveBoard() {
    const data = this.editBoard();
    if (!data || !data.id) return;
    this.boardStore.updateBoard(data.id, data);
    this.editDialogVisible.set(false);
    this.messageService.add({
      severity: 'success',
      summary: 'Updated',
      detail: 'Board updated successfully',
    });
  }

  // Удалить доску
  deleteBoard() {
    const board = this.currentBoard();
    if (!board) return;
    this.confirmationService.confirm({
      message: `Are you sure you want to delete "${board.title}"?`,
      header: 'Delete Board',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.boardStore.deleteBoard(board.id);
        this.router.navigate(['/boards']);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Board deleted successfully',
        });
      },
    });
  }

  // Получить класс фона для превью
  getBackgroundClass(bg: string) {
    return `bg-gradient-to-br ${bg}`;
  }
}
