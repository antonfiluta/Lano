import { SortOptions, Task } from '../models/tasks.models';
import { TASK_PRIORITY, TASK_STATUSES } from './board-layout.constants';

export function compareValues(taskA: Task, taskB: Task, sortBy: SortOptions) {
  let a: unknown;
  let b: unknown;

  if (sortBy === 'status') {
    a = TASK_STATUSES[taskA.status];
    b = TASK_STATUSES[taskB.status];
  } else if (sortBy === 'priority') {
    a = TASK_PRIORITY[taskA.priority || 'low'];
    b = TASK_PRIORITY[taskB.priority || 'low'];
  } else {
    a = taskA[sortBy];
    b = taskB[sortBy];
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  const aStr = String(a);
  const bStr = String(b);
  return aStr.localeCompare(bStr);
}
