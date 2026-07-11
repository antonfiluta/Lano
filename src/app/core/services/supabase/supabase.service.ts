import { Injectable } from '@angular/core';
import { Database } from '@core/types/database.types';
import { environment } from '@env/environment';
import { createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  readonly client = createClient<Database>(
    environment.supabase.url,
    environment.supabase.key,
  );
}
