import { inject } from '@angular/core';
import { ErrorHandler } from '@core/services/error-handler';
import { TasksState } from '@features/board-tasks/models/tasks.models';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TaskRepository } from '@core/repositories/task.repository';
import { mapTaskArray } from '@features/board-tasks/utils/task.mapper';

const initialTasksState: TasksState = {
  tasks: [],
  isLoading: false,
  error: false,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialTasksState),
  // withComputed((store) => ({
  //
  // })),
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

      const loadTasks = (boardId: string) => {
        withLoading(async () => {
          const { data, error } = await taskRepo.getTasks(boardId);
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
