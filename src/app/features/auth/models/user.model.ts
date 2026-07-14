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

export type AuthRequest = Promise<{ error: Error | null }>;
