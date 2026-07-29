import { Database } from '@shared/types/database.types';
import { Board } from '../models/board.models';

export function mapBoards(
  boards: Database['public']['Tables']['boards']['Row'][],
): Board[] {
  return boards.map(({ id, background, icon, title }) => {
    return {
      id,
      background,
      icon,
      title,
    };
  });
}
