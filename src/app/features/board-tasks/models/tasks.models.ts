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
