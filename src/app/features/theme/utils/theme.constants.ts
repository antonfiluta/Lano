import {
  PrimaryColor,
  SurfaceColor,
  ThemeMode,
  ThemeState,
} from '../models/theme.model';

export const THEME_STORAGE_KEY = 'lano-theme';

export const initialThemeState: ThemeState = {
  mode: ThemeMode.System,
  primary: 'emerald',
  surface: 'gray',
};

export const PRIMARY_COLORS: PrimaryColor[] = [
  'emerald',
  'green',
  'lime',
  'red',
  'orange',
  'amber',
  'yellow',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export const SURFACE_COLORS: SurfaceColor[] = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
] as const;
