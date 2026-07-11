export enum ThemePreference {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

export interface Profile {
  id: string;
  name: string | null;
  avatarUrl: string | null;
  occupation: string | null;
  themePreference: ThemePreference;
}

export interface ProfileResponse {
  id: string;
  name: string | null;
  avatar_url: string | null;
  occupation: string | null;
  theme_preference: string | null;
}
