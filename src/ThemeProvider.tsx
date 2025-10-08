import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import * as React from 'react';
import './theme-types';

// Base MUI theme configuration (shared across all themes)
const baseTheme = createTheme({
  typography: {
    fontFamily: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          backgroundColor: '#FDFCEE', // Add background color here
        },
        'input[type="checkbox"], input[type="radio"]': {
          accentColor: theme.palette.secondary.main,
        },
      }),
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});
// Theme configurations
export const muiThemes = {
  default: createTheme(deepmerge(baseTheme, {
    palette: {
      primary: { main: '#AD46FF' },
      secondary: { main: '#D79AFC' },
      accent: { main: '#FFEDD1' },
      dark: { main: '#4D3019' },
      light: { main: '#FEFDF7' },
      markedRead: { main: '#A3D977' },
      custom: {
        iconColor: '#ebc7ff',
        primaryButtonTextColor: '#FFFFFF',
        readByBackgroundColor: '#ebc7ff',
        stepIndicatorTextColor: '#FFFFFF',
        markAsReadBackgroundColor: '#ebc7ff',
        tabBackgroundColor: '#F8F0FC',
      },
    },
    appName: 'ECE Docs', // Add appName
  })),
  school: createTheme(deepmerge(baseTheme, {
    palette: {
      primary: { main: '#386e41' },
      secondary: { main: '#8fc790' },
      accent: { main: '#d5ebde' },
      dark: { main: '#4D3019' },
      light: { main: '#FEFDF7' },
      markedRead: { main: '#A3D977' },
      custom: {
        primaryButtonTextColor: '#FFFFFF',
        stepIndicatorTextColor: '#FFFFFF',
      },
    },
    appName: 'School Docs', // Add appName
  })),
  health: createTheme(deepmerge(baseTheme, {
    palette: {
      primary: { main: '#4871cf' },
      secondary: { main: '#a4d6ff' },
      accent: { main: '#FF9ecb' },
      dark: { main: '#4D3019' },
      light: { main: '#FEFDF7' },
      markedRead: { main: '#A3D977' },
      custom: {
        iconColor: '#a4d6ff',
        primaryButtonTextColor: '#FFFFFF',
        markAsReadBorderColor: '#FF9ecb',
        readByBackgroundColor: '#a4d6ff',
        stepIndicatorTextColor: '#FFFFFF',
        tabBackgroundColor: '#a4d6ff',
      },
    },
    appName: 'GP Docs', // Add appName
  })),
};

export type ThemeKey = keyof typeof muiThemes;

interface ThemeContextType {
  currentTheme: ThemeKey;
  setTheme: (theme: ThemeKey) => void;
  theme: typeof muiThemes[ThemeKey]; // Ensure theme is typed correctly
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeKey>('default');

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme: setCurrentTheme, theme: muiThemes[currentTheme] }}>
      <MuiThemeProvider theme={muiThemes[currentTheme]}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};