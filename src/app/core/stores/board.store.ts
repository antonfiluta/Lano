import { ErrorHandler, inject } from '@angular/core';
import { BoardRepository } from '@core/repositories/board.repository';
import {
  BoardState,
  BoardUpdates,
} from '@features/boards-overview/models/board.models';
import {
  extractStats,
  mapBoard,
} from '@features/boards-overview/utils/board.mapper';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthStore } from './auth.store';

const initialBoardState: BoardState = {
  boards: [],
  stats: null,
  boardSearchQuery: '',
  isLoading: false,
  error: false,
};

export const BoardStore = signalStore(
  { providedIn: 'root' },
  withState(initialBoardState),
  withComputed((store) => ({
    filteredBoards: () => {
      const boards = store.boards();
      const query = store.boardSearchQuery().toLowerCase().trim();

      const filtered = query
        ? boards.filter((board) => board.title.toLowerCase().includes(query))
        : boards;

      return filtered;
    },
  })),
  withMethods(
    (
      store,
      boardRepo = inject(BoardRepository),
      authStore = inject(AuthStore),
      errorHandler = inject(ErrorHandler),
    ) => {
      const withLoading = async (fn: () => void) => {
        patchState(store, { isLoading: true, error: false });

        try {
          await fn();
          patchState(store, {
            isLoading: false,
          });
        } catch (error) {
          errorHandler.handleError(error);

          patchState(store, {
            error: true,
            isLoading: false,
          });
        }
      };

      const loadBoards = async () => {
        withLoading(async () => {
          const { data, error } = await boardRepo.getBoardsWithStats();

          if (error) throw error;

          const { stats, boards } = extractStats(data);

          patchState(store, {
            stats,
            boards,
          });
        });
      };

      const addBoard = async () => {
        withLoading(async () => {
          const owner_id = authStore.user()?.id;
          if (!owner_id) throw new Error('User is undefiend');

          const { data, error } = await boardRepo.addBoard(owner_id);
          if (error) throw error;

          const board = mapBoard(data);

          patchState(store, {
            boards: [...store.boards(), board],
          });
        });
      };

      const deleteBoard = async (boardId: string) => {
        withLoading(async () => {
          const { error } = await boardRepo.deleteBoard(boardId);

          if (error) throw error;

          patchState(store, {
            boards: store.boards().filter((board) => board.id !== boardId),
          });
        });
      };

      const updateBoard = async (boardId: string, updates: BoardUpdates) => {
        withLoading(async () => {
          const { error } = await boardRepo.updateBoard(boardId, updates);

          if (error) throw error;

          patchState(store, {
            boards: store.boards().map((board) => {
              if (board.id === boardId) {
                return {
                  ...board,
                  ...updates,
                };
              }
              return board;
            }),
          });
        });
      };

      const searchBoard = (boardSearchQuery: string) => {
        patchState(store, {
          boardSearchQuery,
        });
      };

      return {
        _loadBoards: loadBoards,
        addBoard,
        deleteBoard,
        updateBoard,
        searchBoard,
      };
    },
  ),
  withHooks((store) => ({
    onInit() {
      store._loadBoards();
    },
  })),
);
