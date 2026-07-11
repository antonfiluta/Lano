import { inject, Injectable } from '@angular/core';
import { LoginData, RegisterData } from '@features/auth/models/user.model';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly supabase = inject(SupabaseService).client;

  public signUp({ email, name, password }: RegisterData) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });
  }

  public signIn({ email, password }: LoginData) {
    return this.supabase.auth.signInWithPassword({
      email,
      password,
    });
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }

  public getSession() {
    return this.supabase.auth.getSession();
  }

  public onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}
