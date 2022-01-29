import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const SCREEN_PADDING = 10;

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#333',
    secondary: '#FFFFFF',
    background: '#F4F4F4',
    placeholderText: '#7d7f86',
    inputBackground: '#dee1e7',
    secondaryText: '#7A7A7A',
    accent: '#6DCE9E',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#e5e5e5',
    success: '#35CE8D',
    error: '#ED6A5A',
    yellow: '#FFB800',
    yellowBackground: '#FFFDE6',
    green: '#35CE8D',
    greenBackground: '#EBFBF4',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    background: '#000',
    placeholderText: '#666',
    inputBackground: '#1e2022',
    secondaryText: '#9A9A9A',
    secondary: '#1a1d1e',
    accent: '#6DCE9E',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#68707e',
    success: '#35CE8D',
    error: '#ED6A5A',
    yellow: '#FFFFFF',
    yellowBackground: '#FFB800',
    green: '#FFFFFF',
    greenBackground: '#35CE8D',
  },
};
