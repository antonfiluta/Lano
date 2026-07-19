import { computed, inject } from '@angular/core';
import {
  AuthRequest,
  AuthUser,
  LoginData,
  RegisterData,
} from '@features/auth/models/user.model';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthRepository } from '../repositories/auth.repository';
import { Profile } from '@features/auth/models/profile.model';
import { ProfileRepository } from '../repositories/profile.repository';
import { ErrorHandler } from '@core/services/error-handler/error-handler';
import { mapProfile, mapUser } from '@features/auth/utils/data.mapper';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { RedirectService } from '@features/auth/services/redirect';

const initialAuthState: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,
  initialized: false,
};

export interface AuthState {
  user: AuthUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  initialized: boolean;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthState),
  withComputed((store) => ({
    displayName: computed(() => store.profile()?.name ?? 'User'),
    avatarUrl: computed(() => store.profile()?.avatarUrl ?? null),
  })),
  withMethods(
    (
      store,
      authRepo = inject(AuthRepository),
      profileRepo = inject(ProfileRepository),
      errorHandler = inject(ErrorHandler),
      notify = inject(NotificationsService),
      redirectService = inject(RedirectService),
    ) => ({
      async login(credentials: LoginData) {
        return this._coverRequest(() => authRepo.signIn(credentials));
      },

      async register(credentials: RegisterData) {
        return this._coverRequest(() => authRepo.signUp(credentials));
      },

      async logout() {
        return this._coverRequest(() => authRepo.signOut());
      },

      async _coverRequest(request: () => AuthRequest) {
        if (store.isLoading()) return false;
        patchState(store, { isLoading: true });
        try {
          const { error } = await request();
          if (error) throw error;
          return true;
        } catch (error) {
          errorHandler.handle(error, 'AuthStore CoverRequest');
          patchState(store, { isLoading: false });
          return false;
        }
      },

      async _applySession(eventType: AuthChangeEvent, session: Session | null) {
        notify.showByAuthEvent(eventType);
        // 1. Если сессии нет — просто сбрасываем состояние и выходим
        if (!session) {
          patchState(store, {
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
          });

          if (eventType !== 'INITIAL_SESSION')
            redirectService.redirectUser(true);
        } else {
          // 2. Сессия есть — пытаемся загрузить профиль
          try {
            const { data, error } = await profileRepo.getProfile(
              session.user.id,
            );
            if (error) throw error;

            const user = mapUser(session.user);
            const profile = mapProfile(data);

            patchState(store, {
              user,
              profile,
              isAuthenticated: true,
              isLoading: false,
            });

            if (eventType !== 'INITIAL_SESSION')
              redirectService.redirectUser(false);
          } catch (error) {
            // 3. Выходим если не найден профиль для текущей сессии
            errorHandler.handle(error, 'AuthStore.onAuthStateChange');
            await authRepo.signOut();
          }
        }

        console.log('before');
        if (eventType === 'INITIAL_SESSION') {
          patchState(store, {
            initialized: true,
          });
        }
      },

      async _initialize() {
        patchState(store, { isLoading: true });

        try {
          await authRepo.getSession();
        } catch (error) {
          errorHandler.handle(error, 'AuthStore Initialize');
        }

        authRepo.onAuthStateChange(async (event, session) => {
          await this._applySession(event, session);
        });
      },
    }),
  ),
  withHooks({
    onInit(store) {
      store._initialize();
    },
  }),
);
