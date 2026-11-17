import { KanbanCol, TaskPriority, TaskStatus } from '../models/tasks.models';

export const BOARD_VIEWS = [
  {
    name: 'By Status',
    route: 'kanban',
    icon: 'objects-column',
  },
  {
    name: 'All Tasks',
    route: 'tasks',
    icon: 'list',
  },
  {
    name: 'Calendar',
    route: 'calendar',
    icon: 'calendar-clock',
  },
];

export const ICON_OPTIONS = [
  'folder',
  'folder-open',
  'user',
  'users',
  'calendar',
  'clock',
  'flag',
  'star',
  'heart',
  'envelope',
  'comment',
  'comments',
  'bell',
  'bell-slash',
  'eye',
  'eye-slash',
  'lock',
  'lock-open',
  'key',
  'home',
  'search',
  'sync',
  'save',
  'print',
  'tag',
  'tags',
  'book',
  'bookmark',
  'youtube',
  'wave-pulse',
  'wallet',
  'video',
  'truck',
  'trophy',
  'sun',
  'slack',
  'sitemap',
  'server',
  'shield',
  'shop',
  'shopping-bag',
  'shopping-cart',
  'paperclip',
  'microchip',
  'megaphone',
  'map',
  'language',
  'image',
  'images',
  'globe',
  'face-smile',
  'exclamation-triangle',
  'crown',
  'chart-pie',
  'car',
  'briefcase',
  'address-book',
  'list-check',
  'list',
  'graduation-cap',
];

export const DEFAULT_ICON = 'list-check';

export const KANBAN_COLS: KanbanCol[] = [
  {
    type: 'to-do',
    color: 'gray',
  },
  {
    type: 'in-progress',
    color: 'blue',
  },
  {
    type: 'completed',
    color: 'green',
  },
];

export const TASK_STATUSES: Record<TaskStatus, number> = {
  'to-do': 0,
  'in-progress': 1,
  completed: 2,
};

export const TASK_PRIORITY: Record<TaskPriority, number> = {
  low: 0,
  medium: 1,
  high: 2,
};
