import { useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { buildTheme } from './theme';
import { COLOR_PRESETS } from './theme/presets';
import { BackgroundLayer } from './components/layout/BackgroundLayer';
import { AppHeader } from './components/layout/AppHeader';
import { FlipCard } from './components/layout/FlipCard';
import { RegisterForm } from './components/common/RegisterForm';
import { Dashboard } from './components/dashboard/Dashboard';
import { GlassCard } from './components/common/GlassCard';
import type { Account } from './shared/types';

export default function App() {
  const [backgroundId, setBackgroundId] = useState('aurora');
  const [presetId, setPresetId] = useState('magenta');
  const [view, setView] = useState('register');
  const [account, setAccount] = useState<Account | null>(null);

  const preset = COLOR_PRESETS.find((p) => p.id === presetId) ?? COLOR_PRESETS[0];
  const theme = buildTheme(preset.primary, preset.secondary);

  const handleSuccess = (neuerAccount: Account) => {
    setAccount(neuerAccount);
    setView('dashboard');
  };

  const flipZuDashboard = () => setView('dashboard');
  const flipZuRegister = () => setView('register');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BackgroundLayer activeId={backgroundId} />
      <AppHeader
        presetId={presetId}
        onPresetChange={setPresetId}
        backgroundId={backgroundId}
        onBackgroundChange={setBackgroundId}
        onFlip={() => setView(view === 'register' ? 'dashboard' : 'register')}
        view={view}
      />
      <Box sx={{ display: 'grid', placeItems: 'center', minHeight: '100dvh', p: 2 }}>
        <FlipCard
          flipped={view === 'dashboard'}
          front={
            <RegisterForm
              onSuccess={handleSuccess}
              onFlip={flipZuDashboard}
            />
          }
          back={
            account !== null ? (
              <Dashboard
                account={account}
                onFlip={flipZuRegister}
              />
            ) : (
              <GlassCard sx={{ position: 'relative' }}>
                <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                  Registriere dich zuerst, um dein Dashboard zu sehen.
                </Typography>
                <Typography
                  color="primary"
                  onClick={flipZuRegister}
                  sx={{ textAlign: 'center', cursor: 'pointer', mt: 1 }}
                >
                  Zurück zur Registrierung
                </Typography>
              </GlassCard>
            )
          }
        />
      </Box>
    </ThemeProvider>
  );
}