import { Routes } from '@angular/router';

export const BOARD_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./feature/board-page/board-page').then((m) => m.BoardPage),
    children: [
      {
        path: 'kanban',
        title: 'Lano Kanban View',
        loadComponent: () =>
          import('./feature/kanban-view/kanban-view').then((m) => m.KanbanView),
      },
      {
        path: 'tasks',
        title: 'Lano All Tasks View',
        loadComponent: () =>
          import('./feature/all-tasks-view/all-tasks-view').then(
            (m) => m.AllTasksView,
          ),
      },
      {
        path: 'calendar',
        title: 'Lano Calendar View',
        loadComponent: () =>
          import('./feature/calendar-view/calendar-view').then(
            (m) => m.CalendarView,
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'kanban',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/not-found',
  },
];
