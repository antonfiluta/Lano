import { User } from '@supabase/supabase-js';
import {
  Profile,
  ProfileResponse,
  ThemePreference,
} from '../models/profile.model';
import { AuthUser } from '../models/user.model';
import { isThemePreference } from './type.guards';

export const mapUser = (data: User): AuthUser => {
  return {
    id: data.id,
    email: data.email,
  };
};

export const mapProfile = (data: ProfileResponse): Profile => {
  const themePreference = data.theme_preference || ThemePreference.System;

  return {
    id: data.id,
    name: data.name,
    avatarUrl: data.avatar_url,
    occupation: data.occupation,
    themePreference: isThemePreference(themePreference)
      ? themePreference
      : ThemePreference.System,
  };
};
