import { createTheme, type Theme } from '@mui/material';
import { createPalette } from './palette';
import { typography } from './text';
import { createComponents } from './components';

export const buildTheme = (primary: string, secondary: string): Theme => {
  const base = createTheme({
    palette: createPalette(primary, secondary),
    typography,
    shape: { borderRadius: 12 }
  });

  return createTheme(base, {
    components: createComponents(base)
  });
};