import { Paper, type PaperProps } from '@mui/material';

export function GlassCard({ children, sx, ...rest }: PaperProps) {
  return (
    <Paper
      {...rest}
      sx={{
        width: '100%',
        maxWidth: 440,
        p: 4,
        borderRadius: 5,
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}