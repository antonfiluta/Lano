import { inject, Service } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';

@Service()
export class TaskRepository {
  private supabaseService = inject(SupabaseService);

  private get supabase() {
    return this.supabaseService.client;
  }

  public getTasks(boardId: string) {
    return this.supabase.from('tasks').select('*').eq('board_id', boardId);
  }
}
