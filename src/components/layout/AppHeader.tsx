import { AppBar, Toolbar, Stack, Typography, Button } from '@mui/material';
import { ColorPicker } from '../common/ColorPicker';
import { BackgroundPicker } from './BackgroundPicker';

interface AppHeaderProps {
  presetId: string;
  onPresetChange: (id: string) => void;
  backgroundId: string;
  onBackgroundChange: (id: string) => void;
  onFlip: () => void;
  view: string;
}

export function AppHeader({
  presetId,
  onPresetChange,
  backgroundId,
  onBackgroundChange,
  onFlip,
  view,
}: AppHeaderProps) {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: 'rgba(8,8,12,0.55)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h2" sx={{ fontSize: '1.1rem' }}>
            Blackflow
          </Typography>

          <Button
            size="small"
            onClick={onFlip}
            sx={{
              color: view === 'dashboard' ? 'primary.main' : 'text.secondary',
              textTransform: 'none',
            }}
          >
            Dashboard
          </Button>

          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', marginLeft: 'auto' }}>
            <ColorPicker activeId={presetId} onChange={onPresetChange} />
            <BackgroundPicker activeId={backgroundId} onChange={onBackgroundChange} />
          </Stack>
        </Toolbar>
      </AppBar>

      <Toolbar />
    </>
  );
}