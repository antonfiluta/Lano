import { Database } from '@shared/types/database.types';
import {
  BoardState,
  BoardViewModel,
  StatResponse,
} from '../models/board.models';

export function mapBoard(
  board: Database['public']['Tables']['boards']['Row'],
): BoardViewModel {
  const { id, background, icon, title } = board;

  return { id, background, icon, title, tasks: 0, progress: 0 };
}

export function extractStats(
  raw: unknown,
): Pick<BoardState, 'stats' | 'boards'> {
  if (!isStatResponse(raw)) {
    throw new Error('Invalid Boards Data from Server');
  }
  const { total, active, completed, overdue, boards } = raw;
  return {
    stats: { total, active, completed, overdue },
    boards: boards.reverse(),
  };
}

function isStatResponse(raw: unknown): raw is StatResponse {
  return (
    raw !== null &&
    typeof raw === 'object' &&
    'total' in raw &&
    typeof raw.total === 'number' &&
    'boards' in raw &&
    Array.isArray(raw.boards)
  );
}
