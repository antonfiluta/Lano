import { computed, inject } from '@angular/core';
import { ErrorHandler } from '@core/services/error-handler';
import {
  SortOptions,
  SortType,
  Task,
  TasksState,
  TaskStatus,
  TaskUpdates,
} from '@features/board-tasks/models/tasks.models';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TaskRepository } from '@core/repositories/task.repository';
import {
  mapTaskArray,
  mapTaskToCamelCase,
} from '@features/board-tasks/utils/task.mapper';
import { AuthStore } from './auth.store';
import { compareValues } from '@features/board-tasks/utils/task.compare';

const initialTasksState: TasksState = {
  tasks: [],
  filters: [],
  sortBy: 'position',
  sortType: 'asc',
  isLoading: false,
  error: false,
};

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState(initialTasksState),
  withComputed((store) => {
    const sortedTasks = computed(() => {
      const sortBy = store.sortBy();
      const sortType = store.sortType();
      const multiplier = sortType === 'asc' ? 1 : -1;

      return [...store.tasks()].sort(
        (taskA, taskB) => compareValues(taskA, taskB, sortBy) * multiplier,
      );
    });

    const kanbanTasks = computed(() => {
      const grouped: Record<TaskStatus, Task[]> = {
        'to-do': [],
        'in-progress': [],
        completed: [],
      };
      for (const task of sortedTasks()) {
        grouped[task.status].push(task);
      }
      return grouped;
    });

    return {
      sortedTasks,
      kanbanTasks,
    };
  }),
  withMethods(
    (
      store,
      taskRepo = inject(TaskRepository),
      authStore = inject(AuthStore),
      errorHandler = inject(ErrorHandler),
    ) => {
      const userIdSignal = computed(() => authStore.user()?.id);

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

      const addTask = (boardId: string, details: TaskUpdates) => {
        withLoading(async () => {
          const userId = userIdSignal();
          if (!userId) throw new Error('User is not found');

          const { data, error } = await taskRepo.addTask(
            boardId,
            userId,
            details,
          );

          if (error) throw error;

          const tasks = [...store.tasks(), mapTaskToCamelCase(data)];
          return {
            tasks,
          };
        });
      };

      const deleteTask = (taskId: string) => {
        withLoading(async () => {
          const { error } = await taskRepo.deleteTask(taskId);
          if (error) throw error;

          const tasks = store.tasks().filter((task) => task.id !== taskId);
          return { tasks };
        });
      };

      const moveTask = (
        taskId: string,
        status: TaskStatus,
        position: number,
      ) => {
        const original = store.tasks().find((t) => t.id === taskId);

        patchState(store, (state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status, position } : task,
          ),
        }));

        return withLoading(async () => {
          const { error } = await taskRepo.updateTask(taskId, {
            status,
            position,
          });

          if (error) {
            if (original) {
              patchState(store, (state) => ({
                tasks: state.tasks.map((task) =>
                  task.id === taskId ? { ...original } : task,
                ),
              }));
            }

            throw error;
          }

          return {};
        });
      };

      const normalizePositions = async (boardId: string, tasks: Task[]) => {
        withLoading(async () => {
          const results = await Promise.all(
            tasks.map(async (task, index) => {
              const { error } = await taskRepo.updateTask(task.id, {
                position: index,
              });
              return error;
            }),
          );

          const failed = results.filter((error) => error !== null);
          if (failed.length > 0) {
            errorHandler.handle(
              new Error(`Failed to update ${failed.length} task positions`),
            );
          }

          const { data, error } = await taskRepo.getTasks(boardId);
          if (error) throw error;

          return { tasks: mapTaskArray(data) };
        });
      };

      const setSortOption = (sortBy: SortOptions) => {
        patchState(store, {
          sortBy,
        });
      };

      const setSortType = (sortType: SortType) => {
        patchState(store, {
          sortType,
        });
      };

      return {
        loadTasks,
        addTask,
        moveTask,
        deleteTask,
        normalizePositions,
        setSortOption,
        setSortType,
      };
    },
  ),
);
