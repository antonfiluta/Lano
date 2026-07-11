import { Subscription } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export type RegisterData = LoginData & {
  name: string;
};

export interface sessionSubscriptionModel {
  data: {
    subscription: Subscription;
  };
}
