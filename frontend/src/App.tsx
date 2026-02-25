import { CssBaseline, ThemeProvider } from '@mui/material';
import AppRouter from './app/AppRouter';
import { appTheme } from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
