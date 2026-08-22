import { Injectable } from '@angular/core';
import { Database } from '@shared/types/database.types';
import { environment } from '@env/environment';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _client: SupabaseClient<Database>;
  private _visibilityChanged$ = new Subject<void>();

  constructor() {
    this._client = this.createClient();
    this.setupVisibilityListener();
  }

  get client(): SupabaseClient<Database> {
    return this._client;
  }

  get visibilityChanged$() {
    return this._visibilityChanged$.asObservable();
  }

  private createClient(): SupabaseClient<Database> {
    return createClient<Database>(
      environment.supabase.url,
      environment.supabase.key,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          storage: localStorage,
        },
        realtime: {
          heartbeatIntervalMs: 5000,
        },
      },
    );
  }

  private setupVisibilityListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this._visibilityChanged$.next();
      }
    });
  }
}
