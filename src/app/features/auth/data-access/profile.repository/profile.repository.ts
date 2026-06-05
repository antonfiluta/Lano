import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  private readonly supabase = inject(SupabaseService).client;

  public async getProfile(userId: string) {
    return this.supabase.from('profiles').select('*').eq('id', userId).single();
  }
}
