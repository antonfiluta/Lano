import { StatCards } from '../models/board.models';

export const STAT_CARDS: StatCards[] = [
  {
    label: 'Total Tasks',
    valueName: 'total',
    icon: 'pi-list',
    color: 'text-primary-500',
  },
  {
    label: 'In Progress',
    valueName: 'active',
    icon: 'pi-spinner',
    color: 'text-amber-500',
  },
  {
    label: 'Completed',
    valueName: 'completed',
    icon: 'pi-check-circle',
    color: 'text-emerald-500',
  },

  {
    label: 'Overdue',
    valueName: 'overdue',
    icon: 'pi-exclamation-circle',
    color: 'text-red-500',
  },
];
