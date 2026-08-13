import { useState } from 'react';
import {
  Stack, Typography, TextField, Button, Divider,
  CircularProgress, Collapse, Alert, IconButton,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { GlassCard } from '../common/GlassCard';
import { PlanSelector } from './PlanSelector';
import { pruefeUsername, pruefeEmail } from '../../utils/validation';
import { registerUser, ApiError } from '../../api/client';
import type { PlanId, Account } from '../../shared/types';

interface RegisterFormProps {
  onSuccess: (account: Account) => void;
  onFlip: () => void;
}

export function RegisterForm({ onSuccess, onFlip }: RegisterFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<PlanId | null>(null);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [laedt, setLaedt] = useState(false);
  const [apiError, setApiError] = useState('');

  const istGueltig =
    pruefeUsername(username) === '' && pruefeEmail(email) === '' && plan !== null;

  const handleSubmit = async () => {
    const uFehler = pruefeUsername(username);
    const eFehler = pruefeEmail(email);
    setUsernameError(uFehler);
    setEmailError(eFehler);

    if (uFehler !== '' || eFehler !== '' || plan === null) {
      return;
    }

    setLaedt(true);
    setApiError('');

    try {
      const account = await registerUser({ username, email, plan });
      onSuccess(account);
    } catch (err) {
      if (err instanceof ApiError) {
        setApiError(err.message);
        if (err.field === 'username') setUsernameError(err.message);
        if (err.field === 'email') setEmailError(err.message);
      } else {
        setApiError('Die Registrierung ist fehlgeschlagen. Bitte versuche es erneut.');
      }
    } finally {
      setLaedt(false);
    }
  };

  return (
    <GlassCard sx={{ position: 'relative' }}>
      <IconButton
        onClick={onFlip}
        aria-label="Zum Dashboard wechseln"
        sx={{ position: 'absolute', top: 12, right: 12 }}
      >
        <SwapHorizIcon />
      </IconButton>

      <Stack spacing={1} sx={{ alignItems: 'center', mb: 3 }}>
        <Typography variant="h1">Blackflow</Typography>
        <Typography variant="h2" color="text.secondary">
          Jetzt registrieren
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Erstelle deinen Zugang und erhalte sofort dein persönliches Passwort.
        </Typography>
      </Stack>

      <Typography variant="overline" color="text.secondary">
        Persönliche Daten
      </Typography>

      <Stack spacing={2} sx={{ mt: 1.5 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setUsernameError(pruefeUsername(username))}
          error={usernameError !== ''}
          helperText={usernameError}
        />
        <TextField
          label="E-Mail-Adresse"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setEmailError(pruefeEmail(email))}
          error={emailError !== ''}
          helperText={emailError}
        />
      </Stack>

      <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mt: 3 }}>
        Abo wählen
      </Typography>
      <PlanSelector value={plan} onChange={setPlan} />

      <Button
        variant="contained"
        size="large"
        fullWidth
        disabled={!istGueltig || laedt}
        onClick={handleSubmit}
        startIcon={laedt ? <CircularProgress size={18} color="inherit" /> : null}
        sx={{ mt: 3 }}
      >
        {laedt ? 'Wird registriert' : 'Registrieren'}
      </Button>

      <Collapse in={apiError !== ''}>
        <Alert severity="error" onClose={() => setApiError('')} sx={{ mt: 2 }}>
          {apiError}
        </Alert>
      </Collapse>
    </GlassCard>
  );
}