// frontend/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Örneğin, mavi tonları
    },
    secondary: {
      main: '#dc004e', // Örneğin, kırmızı tonları
    },
    background: {
      default: '#f4f6f8', // Açık arka plan
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
