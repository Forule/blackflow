import type { Theme } from '@mui/material';

type TypographyOptions = NonNullable<Theme['typography']>;

export const typography: TypographyOptions = {
  fontFamily: '"Poppins", system-ui, sans-serif',
  h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
  h2: { fontSize: '1.5rem', fontWeight: 600 },
  body1: { fontSize: '0.95rem' },
  body2: { fontSize: '0.85rem' },
  overline: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' },
} as unknown as TypographyOptions;