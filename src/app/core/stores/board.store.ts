import { computed, ErrorHandler, inject } from '@angular/core';
import { BoardRepository } from '@core/repositories/board.repository';
import { AllBoardsStats, Board } from '@features/board/models/board.models';
import { mapBoards } from '@features/board/utils/board.mapper';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

const initialBoardState: BoardState = {
  boards: [],
  currentBoardId: null,
  stats: null,
  isLoading: false,
  error: false,
};

export interface BoardState {
  boards: Board[];
  currentBoardId: string | null;
  stats: AllBoardsStats | null;
  isLoading: boolean;
  error: boolean;
}

export const BoardStore = signalStore(
  { providedIn: 'root' },
  withState(initialBoardState),
  withComputed((store) => ({
    statCards: computed(() => {
      const s = store.stats();
      if (!s) return [];
      return [
        {
          label: 'Total Tasks',
          value: s.total,
          icon: 'pi-list',
          color: 'text-primary-500',
        },
        {
          label: 'In Progress',
          value: s.active,
          icon: 'pi-spinner',
          color: 'text-amber-500',
        },
        {
          label: 'Completed',
          value: s.completed,
          icon: 'pi-check-circle',
          color: 'text-emerald-500',
        },
        {
          label: 'Overdue',
          value: s.overdue,
          icon: 'pi-exclamation-circle',
          color: 'text-red-500',
        },
      ];
    }),
  })),
  withMethods(
    (
      store,
      boardRepo = inject(BoardRepository),
      errorHandler = inject(ErrorHandler),
    ) => ({
      async load() {
        patchState(store, { isLoading: true });

        try {
          const { error, data } = await boardRepo.getBoards();
          if (error) throw error;
          const boards = mapBoards(data ?? []);

          patchState(store, {
            boards,
            error: false,
            isLoading: false,
          });
        } catch (error) {
          errorHandler.handleError(error);
          patchState(store, {
            error: true,
            isLoading: false,
          });
        }
      },

      async loadStats() {
        patchState(store, { isLoading: true, error: false });

        try {
          const { data, error } = await boardRepo.getStats();
          if (error) throw error;

          if (!data) return;

          patchState(store, {
            stats: data as unknown as AllBoardsStats,
            error: false,
            isLoading: false,
          });
        } catch (error) {
          errorHandler.handleError(error);
          patchState(store, {
            error: true,
            isLoading: false,
          });
        }
      },
    }),
  ),
  withHooks((store) => ({
    onInit() {
      store.load();
      store.loadStats();
    },
  })),
);
