import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    appName: string;
  }
  interface ThemeOptions {
    appName?: string;
  }
  interface Palette {
    accent: Palette['primary'];
    dark: Palette['primary'];
    light: Palette['primary'];
    markedRead: Palette['primary'];
    custom: {
      iconColor?: string;
      primaryButtonTextColor?: string;
      markAsReadBorderColor?: string;
      markAsReadBackgroundColor?: string;
      readByBackgroundColor?: string;
      stepIndicatorTextColor?: string;
      tabBackgroundColor?: string;
    };
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
    dark?: PaletteOptions['primary'];
    light?: PaletteOptions['primary'];
    markedRead?: PaletteOptions['primary'];
    custom?: {
      iconColor?: string;
      primaryButtonTextColor?: string;
      markAsReadBorderColor?: string;
      markAsReadBackgroundColor?: string;
      readByBackgroundColor?: string;
      stepIndicatorTextColor?: string;
      tabBackgroundColor?: string;
    };
  }
}