import { Component, inject, input, signal } from '@angular/core';
import { BoardStore } from '@core/stores/board.store';
import { NotificationsService } from '@core/services/notifications.service';
import { BoardViewModel } from '@features/boards-overview/models/board.models';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { PrimeButton } from '@shared/ui/prime-button/prime-button';
import { SafeAction } from '@features/board-tasks/models/tasks.models';

@Component({
  selector: 'app-board-header-options',
  imports: [PopoverModule, ButtonModule, PrimeButton],
  templateUrl: './board-header-options.html',
  styleUrl: './board-header-options.css',
})
export class BoardHeaderOptions {
  public readonly board = input.required<BoardViewModel>();

  private readonly boardStore = inject(BoardStore);
  private readonly notify = inject(NotificationsService);

  protected isFavorite = signal(false); //TODO add to Datebase

  protected renameBoard(): void {
    // TODO: implement rename logic
  }

  protected duplicateBoard(): void {
    // TODO: implement duplicate logic
  }

  protected deleteBoard(): void {
    this.boardStore.deleteBoard(this.board().id);
  }

  protected toggleFavorite(): void {
    this.isFavorite.update((value) => !value);
  }

  protected copyLink(): void {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        this.notify.info({ detail: 'Link copied successfully' });
      })
      .catch(() => {
        this.notify.error({ detail: 'Could not copy link' });
      });
  }

  protected readonly safeActions: SafeAction[] = [
    {
      action: () => this.renameBoard(),
      icon: 'pencil',
      title: 'Rename',
      kbd: '⌘R',
    },
    {
      action: () => this.duplicateBoard(),
      icon: 'clone',
      title: 'Duplicate',
      kbd: '⌘D',
    },
    {
      action: () => this.copyLink(),
      icon: 'link',
      title: 'Copy link',
      kbd: '⌘⇧C',
    },
  ];
}
