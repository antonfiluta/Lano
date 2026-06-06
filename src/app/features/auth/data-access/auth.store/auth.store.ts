import { computed, inject } from '@angular/core';
import {
  AuthUser,
  LoginData,
  RegisterData,
  sessionSubscriptionModel,
} from '@features/auth/models/user.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthRepository } from '../auth.repository/auth.repository';
import { Profile } from '@features/auth/models/profile.model';
import { ProfileRepository } from '../profile.repository/profile.repository';
import { ErrorHandler } from '@core/services/error-handler/error-handler';
import { mapProfile, mapUser } from '@features/auth/utils/data.mapper';
import { Session } from '@supabase/supabase-js';

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
    isReady: computed(() => store.initialized() && !store.isLoading()),
  })),
  withMethods(
    (
      store,
      authRepo = inject(AuthRepository),
      profileRepo = inject(ProfileRepository),
      errorHandler = inject(ErrorHandler),
    ) => {
      const applySession = async (session: Session | null) => {
        if (!session) {
          patchState(store, {
            user: null,
            profile: null,
            isAuthenticated: false,
          });
          return;
        }

        try {
          const { data, error } = await profileRepo.getProfile(session.user.id);
          if (error) throw error;

          const user = mapUser(session.user);
          const profile = mapProfile(data);

          patchState(store, {
            user,
            profile,
            isAuthenticated: true,
          });
        } catch (error) {
          errorHandler.handle(error, 'AuthStore.onAuthStateChange');

          await authRepo.signOut();
          patchState(store, {
            user: null,
            profile: null,
            isAuthenticated: false,
          });
        }
      };

      const coverRequest = async (
        request: () => Promise<{ error: Error | null }>,
      ) => {
        patchState(store, { isLoading: true });
        try {
          const { error } = await request();
          if (error) throw error;
          return true;
        } catch (error) {
          errorHandler.handle(error);
          return false;
        } finally {
          patchState(store, { isLoading: false });
        }
      };

      let sessionSubscrition: sessionSubscriptionModel | null = null;

      return {
        async login(credentials: LoginData): Promise<boolean> {
          return coverRequest(() => authRepo.signIn(credentials));
        },

        async register(credentials: RegisterData) {
          return coverRequest(() => authRepo.signUp(credentials));
        },

        async logout() {
          return coverRequest(() => authRepo.signOut());
        },

        async initialize() {
          patchState(store, { isLoading: true });
          try {
            const {
              data: { session },
              error,
            } = await authRepo.getSession();
            if (error) throw error;
            await applySession(session);
          } catch (error) {
            errorHandler.handle(error, 'Initialization');
          } finally {
            patchState(store, {
              initialized: true,
              isLoading: false,
            });

            if (!sessionSubscrition) {
              sessionSubscrition = authRepo.onAuthStateChange(
                async (_, session) => {
                  await applySession(session);
                },
              );
            }
          }
        },
      };
    },
  ),
);
