import { ThemePreference } from '../models/profile.model';

export const isThemePreference = (value: string): value is ThemePreference => {
  return Object.values(ThemePreference).includes(value as ThemePreference);
};
