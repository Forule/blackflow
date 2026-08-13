import { Hono } from 'hono';
import type { Account, RegisterInput } from '../../shared/types';

const VERGEBENE_NAMEN = ['admin', 'max.mustermann'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function erzeugePasswort(laenge = 16): string {
  const zeichen = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%';
  const zufall = crypto.getRandomValues(new Uint8Array(laenge));
  let passwort = '';
  for (const byte of zufall) {
    passwort += zeichen[byte % zeichen.length];
  }
  return passwort;
}

export const auth = new Hono();

auth.post('/register', async (c) => {
  let body: RegisterInput;

  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: 'Ungültiges Anfrageformat.' }, 400);
  }

  const username = (body.username ?? '').trim();
  const email = (body.email ?? '').trim();

  if (username.length < 3) {
    return c.json({ error: 'Username muss mindestens 3 Zeichen haben.', field: 'username' }, 400);
  }
  if (!EMAIL_PATTERN.test(email)) {
    return c.json({ error: 'Diese E-Mail-Adresse sieht nicht gültig aus.', field: 'email' }, 400);
  }
  if (body.plan !== 'monthly' && body.plan !== 'yearly') {
    return c.json({ error: 'Bitte wähle ein Abo.' }, 400);
  }
  if (VERGEBENE_NAMEN.includes(username.toLowerCase())) {
    return c.json({ error: 'Dieser Username existiert bereits.', field: 'username' }, 409);
  }

  const account: Account = {
    username,
    email,
    password: erzeugePasswort(),
    planName: body.plan === 'monthly' ? 'Blackflow Basic' : 'Blackflow Pro',
    planAmount: body.plan === 'monthly' ? '9,90 € / monatlich' : '79,90 € / jährlich',
    start: '01. Juni 2026',
    renewal: '01. Juli 2026',
  };

  return c.json(account, 201);
});

auth.post('/password', (c) => {
  return c.json({ password: erzeugePasswort() });
});