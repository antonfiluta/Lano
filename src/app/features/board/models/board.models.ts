export interface Board {
  id: string;
  title: string;
  icon: string;
  background: string;
}

export type TaskStatus = 'to-do' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';
export type BoardView = 'kanban' | 'list' | 'calendar' | 'chart' | 'statistics';

export interface Task {
  boardId: string;
  id: string;
  title: string;
  status: TaskStatus;
  hidden: boolean;
  position: number;
  priority: TaskPriority | null;
  description: string | null;
  dueDate: string | null;
  assigneeId: string | null;
  createdAt: string;
}

export interface AllBoardsStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  boards: BoardStats[];
}

export interface BoardStats extends Board {
  tasks: number;
  progress: number;
}
