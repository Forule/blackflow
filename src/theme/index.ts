import { createTheme } from '@mui/material';

export function buildTheme(primary: string, secondary: string) {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: primary },
      secondary: { main: secondary },
      background: {
        default: '#08080C',
        paper: 'rgba(22, 22, 30, 0.72)',
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.62)',
      },
      divider: 'rgba(255, 255, 255, 0.10)',
      success: { main: '#4ADE80' },
      error: { main: '#F43F5E' },
    },

    shape: { borderRadius: 12 },

    typography: {
      fontFamily: '"Poppins", system-ui, sans-serif',
      h1: { fontSize: '2rem', fontWeight: 700 },
      h2: { fontSize: '1.5rem', fontWeight: 600 },
      body1: { fontSize: '0.95rem' },
      body2: { fontSize: '0.85rem' },
      overline: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em' },
    },

    components: {
      MuiTextField: {
        defaultProps: { variant: 'outlined', fullWidth: true },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600 },
        },
      },
    },
  });
}