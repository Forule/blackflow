import { alpha, type Theme,type Components } from '@mui/material';


export const createComponents = (theme: Theme): Components<Theme> => ({
  MuiTextField: {
    defaultProps: { variant: 'outlined', fullWidth: true }
  },
  MuiButton: {
    styleOverrides: {
      root: { textTransform: 'none', fontWeight: 600, borderRadius: 12 },
    },
    variants: [
      {
        // "Wenn der Button im React-Code variant='contained' und color='primary' hat..."
        props: { variant: 'contained', color: 'primary' },
        // "...dann wende genau diesen Style an:"
        style: {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          transition: 'background 400ms ease, box-shadow 250ms ease',
          '&:hover': { boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}` }
        }
      }
    ]
  },
  MuiToggleButton: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        border: `1px solid ${theme.palette.divider}`,
        textTransform: 'none',
        transition: 'background 400ms ease, border-color 400ms ease',
        '&.Mui-selected': {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          borderColor: 'transparent'
        }
      }
    }
  }
});