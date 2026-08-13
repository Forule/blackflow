import { Typography } from '@mui/material';

interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

export function InfoRow({ label, value, mono = false }: InfoRowProps) {
  return (
    <>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          textAlign: 'right',
          fontFamily: mono ? 'monospace' : undefined,
        }}
      >
        {value}
      </Typography>
    </>
  );
}