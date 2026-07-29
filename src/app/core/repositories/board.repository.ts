import { inject, Service } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';

@Service()
export class BoardRepository {
  private supabaseService = inject(SupabaseService);

  private get supabase() {
    return this.supabaseService.client;
  }

  public getBoards() {
    return this.supabase.from('boards').select('*');
  }

  public getStats() {
    return this.supabase.rpc('get_dashboard_stats');
  }
}
