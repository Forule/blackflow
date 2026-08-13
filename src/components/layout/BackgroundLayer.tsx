import { Box } from '@mui/material';
import { BACKGROUNDS } from '../../theme/backgrounds';

interface BackgroundLayerProps {
  activeId: string;
}

export function BackgroundLayer({ activeId }: BackgroundLayerProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {BACKGROUNDS.map((bg) => (
        <Box
          key={bg.id}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${bg.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: bg.id === activeId ? 1 : 0,
            transition: 'opacity 900ms ease-in-out',
          }}
        />
      ))}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,8,12,0.55), rgba(8,8,12,0.78))',
        }}
      />
    </Box>
  );
}