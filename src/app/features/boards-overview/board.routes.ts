import { Routes } from '@angular/router';
import { BoardLayout } from '../board-tasks/pages/board-layout/board-layout';

export const BOARD_ROUTES: Routes = [
  {
    path: '',
    component: BoardLayout,
    children: [
      {
        path: 'kanban',
        title: 'Kanban View',
        loadComponent: () =>
          import('../board-tasks/pages/board-views/kanban-view/kanban-view').then(
            (m) => m.KanbanView,
          ),
      },
      {
        path: 'tasks',
        title: 'All Tasks View',
        loadComponent: () =>
          import('../board-tasks/pages/board-views/all-tasks-view/all-tasks-view').then(
            (m) => m.AllTasksView,
          ),
      },
      {
        path: 'calendar',
        title: 'Calendar View',
        loadComponent: () =>
          import('../board-tasks/pages/board-views/calendar-view/calendar-view').then(
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
];
