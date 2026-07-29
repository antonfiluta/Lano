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
import { mapProfile, mapUser } from '@features/auth/utils/auth.mapper';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { NotificationsService } from '@core/services/notifications/notifications.service';
import { RedirectService } from '@features/auth/services/redirect';
import { SupabaseService } from '@core/services/supabase/supabase.service';
import { Subscription } from 'rxjs';

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
      errorHandler = inject(ErrorHandler),
      notify = inject(NotificationsService),
      profileRepo = inject(ProfileRepository),
      redirectService = inject(RedirectService),
      supabaseService = inject(SupabaseService),
    ) => {
      let authSubscription: { unsubscribe: () => void } | null = null;
      let visibilitySubscription: Subscription | null = null;
      let skipSideEffects = false;
      let skipTimer: number | null = null;

      const coverRequest = async (
        request: () => AuthRequest,
      ): Promise<boolean> => {
        if (store.isLoading()) return false;
        patchState(store, { isLoading: true });
        try {
          const { error } = await request();
          if (error) throw error;
          patchState(store, { isLoading: false });
          return true;
        } catch (error) {
          errorHandler.handle(error, 'AuthStore CoverRequest');
          patchState(store, { isLoading: false });
          return false;
        }
      };

      const applySession = async (
        eventType: AuthChangeEvent,
        session: Session | null,
      ) => {
        const shouldSkip = skipSideEffects;
        skipSideEffects = false;

        if (skipTimer) {
          clearTimeout(skipTimer);
          skipTimer = null;
        }

        if (!shouldSkip) {
          notify.showByAuthEvent(eventType);
        }

        if (!session) {
          patchState(store, {
            user: null,
            profile: null,
            isAuthenticated: false,
            isLoading: false,
          });

          if (eventType !== 'INITIAL_SESSION' && !shouldSkip) {
            redirectService.redirectUser(true);
          }
        } else {
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

            if (eventType !== 'INITIAL_SESSION' && !shouldSkip) {
              redirectService.redirectUser(false);
            }
          } catch (error) {
            errorHandler.handle(error, 'AuthStore.onAuthStateChange');
            await authRepo.signOut();
          }
        }

        if (eventType === 'INITIAL_SESSION' && !skipSideEffects) {
          patchState(store, { initialized: true });
        }
      };

      const subscribeToAuthChanges = () => {
        if (authSubscription) {
          authSubscription.unsubscribe();
          authSubscription = null;
        }

        const {
          data: { subscription },
        } = authRepo.onAuthStateChange((event, session) => {
          applySession(event, session).catch((err) => {
            errorHandler.handle(err, 'AuthStore.onAuthStateChange');
          });
        });
        authSubscription = subscription;
      };

      const initialize = async () => {
        patchState(store, { isLoading: true });

        try {
          await authRepo.getSession();
        } catch (error) {
          errorHandler.handle(error, 'AuthStore Initialize');
        }

        subscribeToAuthChanges();

        if (visibilitySubscription) {
          visibilitySubscription.unsubscribe();
        }

        visibilitySubscription = supabaseService.visibilityChanged$.subscribe(
          () => {
            skipSideEffects = true;
            if (skipTimer) {
              clearTimeout(skipTimer);
            }
            skipTimer = setTimeout(() => {
              skipSideEffects = false;
              skipTimer = null;
            }, 1000);
          },
        );
      };

      return {
        login: (credentials: LoginData) => {
          return coverRequest(() => authRepo.signIn(credentials));
        },
        register: (credentials: RegisterData) => {
          return coverRequest(() => authRepo.signUp(credentials));
        },
        logout: () => {
          return coverRequest(() => authRepo.signOut());
        },
        _initialize: initialize,
      };
    },
  ),
  withHooks({
    onInit(store) {
      store._initialize();
    },
  }),
);
