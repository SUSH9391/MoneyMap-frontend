export const brand = {
  50:  '#F5F3FF',
  100: '#EDE9FE',
  200: '#DDD6FE',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#7C6FF7',
  600: '#6D5FED',
  700: '#5B4DD6',
  800: '#4237A8',
  900: '#2E2478',
} as const;

export const zinc = {
  50:  '#FAFAFA',
  100: '#F4F4F5',
  200: '#E4E4E7',
  300: '#D4D4D8',
  400: '#A1A1AA',
  500: '#71717A',
  600: '#52525B',
  700: '#3F3F46',
  800: '#27272A',
  900: '#18181B',
} as const;

export const Colors = {
  light: {
    background: '#FFFFFF',
    surface: zinc[50],
    card: zinc[100],
    border: zinc[200],
    text: zinc[900],
    textSecondary: zinc[500],
    primary: brand[500],
    success: '#4D7C5F',
    danger: '#BE3A50',
    warning: '#A16207',
  },
  dark: {
    background: zinc[900],
    surface: zinc[800],
    card: zinc[800],
    border: zinc[700],
    text: zinc[50],
    textSecondary: zinc[400],
    primary: brand[400],
    success: '#6A9E7F',
    danger: '#D95C72',
    warning: '#CA8A04',
  },
};