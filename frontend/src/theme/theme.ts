import { createTheme } from '@mui/material/styles';
import { appColors } from './tokens';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: appColors.gold,
      light: appColors.goldLight,
    },
    background: {
      default: appColors.bgVoid,
      paper: appColors.bgElevated,
    },
    text: {
      primary: appColors.textPrimary,
      secondary: appColors.textSecondary,
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "'Cormorant Garamond', serif",
      fontWeight: 400,
    },
  },
  shape: {
    borderRadius: 12,
  },
});
