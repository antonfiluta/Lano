import { inject, untracked } from '@angular/core';
import { ErrorHandler } from '@core/services/error-handler/error-handler';
import { TasksState } from '@features/board-tasks/models/tasks.models';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { BoardStore } from './board.store';
import { TaskRepository } from '@core/repositories/task.repository';
import { mapTaskArray } from '@features/board-tasks/utils/task.mapper';
import { BoardViewModel } from '@features/boards-overview/models/board.models';

const initialTasksState: TasksState = {
  tasks: [],
  activeBoardId: null,
  isLoading: false,
  error: false,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialTasksState),
  withComputed((store, boardStore = inject(BoardStore)) => ({
    activeBoard: () => {
      let boards: BoardViewModel[] = [];

      untracked(() => {
        boards = boardStore.boards();
      });

      return boards.find((board) => board.id === store.activeBoardId());
    },
  })),
  withMethods(
    (
      store,
      taskRepo = inject(TaskRepository),
      errorHandler = inject(ErrorHandler),
    ) => {
      const withLoading = async (fn: () => Promise<Partial<TasksState>>) => {
        patchState(store, { isLoading: true, error: false });

        try {
          const data = await fn();
          patchState(store, {
            ...data,
            isLoading: false,
          });
        } catch (error) {
          errorHandler.handle(error);

          patchState(store, {
            error: true,
            isLoading: false,
          });
        }
      };

      const loadTasks = (activeBoardId: string) => {
        patchState(store, { activeBoardId });

        withLoading(async () => {
          const { data, error } = await taskRepo.getTasks(activeBoardId);

          if (error) throw error;

          const tasks = mapTaskArray(data);

          return { tasks };
        });
      };

      return {
        loadTasks,
      };
    },
  ),
);
