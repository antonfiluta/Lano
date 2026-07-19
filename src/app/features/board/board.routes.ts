import { Routes } from '@angular/router';

export const BOARD_ROUTES: Routes = [
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/board-page/board-page').then((m) => m.BoardPage),
    children: [
      {
        path: 'kanban',
        title: 'Lano Kanban View',
        loadComponent: () =>
          import('./pages/kanban-view/kanban-view').then((m) => m.KanbanView),
      },
      {
        path: 'tasks',
        title: 'Lano All Tasks View',
        loadComponent: () =>
          import('./pages/all-tasks-view/all-tasks-view').then(
            (m) => m.AllTasksView,
          ),
      },
      {
        path: 'calendar',
        title: 'Lano Calendar View',
        loadComponent: () =>
          import('./pages/calendar-view/calendar-view').then(
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
