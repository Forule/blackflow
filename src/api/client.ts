import type { Account, RegisterInput } from '../shared/types';

export class ApiError extends Error {
  field: string;

  constructor(message: string, field = '') {
    super(message);
    this.field = field;
  }
}

export async function registerUser(input: RegisterInput): Promise<Account> {
  let res: Response;

  try {
    res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  } catch {
    throw new ApiError('Keine Verbindung zum Server.');
  }

  if (!res.ok) {
    const fehler = await res.json().catch(() => null);
    throw new ApiError(
      fehler?.error ?? 'Ein unbekannter Fehler ist aufgetreten.',
      fehler?.field ?? '',
    );
  }

  return res.json();
}

export async function neuesPasswort(): Promise<string> {
  const res = await fetch('/api/auth/password', { method: 'POST' });
  if (!res.ok) throw new ApiError('Passwort konnte nicht erzeugt werden.');
  const daten = await res.json();
  return daten.password;
}