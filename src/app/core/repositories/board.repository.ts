import { inject, Service } from '@angular/core';
import { SupabaseService } from '@core/services/supabase.service';
import { BoardUpdates } from '@features/boards-overview/models/board.models';

@Service()
export class BoardRepository {
  private supabaseService = inject(SupabaseService);

  private get supabase() {
    return this.supabaseService.client;
  }

  public getBoards() {
    return this.supabase
      .from('boards')
      .select('*')
      .order('created_at', { ascending: true });
  }

  public addBoard(ownerId: string) {
    return this.supabase
      .from('boards')
      .insert({
        owner_id: ownerId,
      })
      .select()
      .single();
  }

  public deleteBoard(boardId: string) {
    return this.supabase.from('boards').delete().eq('id', boardId);
  }

  public updateBoard(id: string, updates: BoardUpdates) {
    return this.supabase
      .from('boards')
      .update({
        ...updates,
      })
      .eq('id', id);
  }

  public getBoardsWithStats() {
    return this.supabase.rpc('get_dashboard_stats');
  }
}
