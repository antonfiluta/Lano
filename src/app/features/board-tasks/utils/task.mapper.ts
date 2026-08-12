import {
  RawTask,
  Task,
  TaskPriority,
  TaskStatus,
} from '../models/tasks.models';

export function mapTask(raw: RawTask): Task {
  return {
    boardId: raw.board_id,
    id: raw.id,
    title: raw.title,
    status: raw.status as TaskStatus,
    hidden: raw.hidden,
    position: raw.position,
    priority: raw.priority ? (raw.priority as TaskPriority) : null,
    description: raw.description,
    dueDate: raw.due_date,
    assigneeId: raw.assignee_id,
    createdAt: raw.created_at,
  };
}

export function mapTaskArray(rawArray: RawTask[]): Task[] {
  return rawArray.map((rawTask) => mapTask(rawTask));
}
