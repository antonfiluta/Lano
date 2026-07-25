import { inject, Injectable } from '@angular/core';
import { SupabaseService } from '@core/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileRepository {
  private supabase = inject(SupabaseService).client;

  public getProfile(userId: string) {
    return this.supabase.from('profiles').select('*').eq('id', userId).single();
  }
}
