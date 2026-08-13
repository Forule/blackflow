import { useState } from 'react';
import {
  Box, Stack, Typography, IconButton, Button, Chip, Snackbar, Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Refresh from '@mui/icons-material/Refresh';
import OpenInNew from '@mui/icons-material/OpenInNew';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { GlassCard } from '../common/GlassCard';
import { InfoRow } from './InfoRow';
import { neuesPasswort } from '../../api/client';
import type { Account } from '../../shared/types';

interface DashboardProps {
  account: Account;
  onFlip: () => void;
}

export function Dashboard({ account, onFlip }: DashboardProps) {
  const [passwort, setPasswort] = useState(account.password);
  const [sichtbar, setSichtbar] = useState(false);
  const [meldung, setMeldung] = useState('');
  const [laedt, setLaedt] = useState(false);

  const handleKopieren = async () => {
    try {
      await navigator.clipboard.writeText(passwort);
      setMeldung('Passwort kopiert');
    } catch {
      setMeldung('Kopieren nicht möglich.');
    }
  };

  const handleNeuGenerieren = async () => {
    setLaedt(true);
    try {
      const neues = await neuesPasswort();
      setPasswort(neues);
      setMeldung('Neues Passwort erzeugt');
    } catch {
      setMeldung('Passwort konnte nicht erneuert werden.');
    } finally {
      setLaedt(false);
    }
  };

  return (
    <GlassCard sx={{ position: 'relative' }}>
      <IconButton
        onClick={onFlip}
        aria-label="Zur Registrierung wechseln"
        sx={{ position: 'absolute', top: 12, right: 12 }}
      >
        <SwapHorizIcon />
      </IconButton>

      <Stack spacing={0.5} sx={{ alignItems: 'center', mb: 3 }}>
        <Typography variant="h1">Blackflow</Typography>
        <Typography variant="h2" color="text.secondary">
          Mein Dashboard
        </Typography>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="overline" color="text.secondary">
        Account
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 2,
          rowGap: 1.25,
          mt: 1,
        }}
      >
        <InfoRow label="Username" value={account.username} />
        <InfoRow label="E-Mail" value={account.email} />
      </Box>

      <Box sx={{ mt: 3, p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="overline" color="text.secondary">
          Kennwort
        </Typography>

        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mt: 1 }}
        >
          <Typography sx={{ fontFamily: 'monospace', letterSpacing: sichtbar ? 0 : '0.2em' }}>
            {sichtbar ? passwort : '•'.repeat(passwort.length)}
          </Typography>

          <Stack direction="row">
            <IconButton
              onClick={() => setSichtbar(!sichtbar)}
              aria-label={sichtbar ? 'Passwort verbergen' : 'Passwort anzeigen'}
            >
              {sichtbar ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton onClick={handleKopieren} aria-label="Passwort kopieren">
              <ContentCopy />
            </IconButton>
          </Stack>
        </Stack>

        <Button
          startIcon={<Refresh />}
          onClick={handleNeuGenerieren}
          disabled={laedt}
          sx={{ mt: 1 }}
        >
          {laedt ? 'Wird erzeugt' : 'Passwort neu generieren'}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="overline" color="text.secondary">
          Abo & Abrechnung
        </Typography>
        <Chip size="small" color="success" label="Aktiv" />
      </Stack>

      <Typography sx={{ fontWeight: 700, mt: 1 }}>{account.planName}</Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          columnGap: 2,
          rowGap: 1.25,
          mt: 1,
        }}
      >
        <InfoRow label="Betrag" value={account.planAmount} mono />
        <InfoRow label="Beginn" value={account.start} />
        <InfoRow label="Verlängerung am" value={account.renewal} />
      </Box>

      <Button
        variant="outlined"
        fullWidth
        endIcon={<OpenInNew />}
        sx={{ mt: 3 }}
      >
        Zum Stripe-Kundenportal
      </Button>

      <Snackbar
        open={meldung !== ''}
        autoHideDuration={2000}
        onClose={() => setMeldung('')}
        message={meldung}
      />
    </GlassCard>
  );
}