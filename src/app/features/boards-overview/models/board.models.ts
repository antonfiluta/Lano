export interface BoardState {
  boards: BoardViewModel[];
  stats: TotalStats | null;
  boardSearchQuery: string;
  isLoading: boolean;
  error: boolean;
}

export interface Board {
  id: string;
  title: string;
  icon: string;
  background: string;
  description: string;
}

export interface BoardViewModel extends Board {
  tasks: number;
  progress: number;
}

export interface TotalStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
}

export interface StatCards {
  label: string;
  valueName: keyof TotalStats;
  icon: string;
  color: string;
}

export type BoardUpdates = Partial<Board>;

export interface StatResponse extends TotalStats {
  boards: BoardViewModel[];
}
