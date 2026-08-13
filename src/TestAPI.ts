import type { Account, RegisterInput } from './shared/types';

const VERGEBENE_NAMEN = ['admin', 'max.mustermann'];

export class ApiError extends Error {
  field: string;

  constructor(message: string, field = '') {
    super(message);
    this.field = field;
  }
}

function warte(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function erzeugePasswort(laenge = 16): string {
  const zeichen = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#$%';
  const zufall = crypto.getRandomValues(new Uint8Array(laenge));
  let passwort = '';
  for (const byte of zufall) {
    passwort += zeichen[byte % zeichen.length];
  }
  return passwort;
}

export async function registerUser(input: RegisterInput): Promise<Account> {
  await warte(900);

  if (VERGEBENE_NAMEN.includes(input.username.toLowerCase())) {
    throw new ApiError('Dieser Username existiert bereits.', 'username');
  }

  return {
    username: input.username,
    email: input.email,
    password: erzeugePasswort(),
    planName: input.plan === 'monthly' ? 'Blackflow Basic' : 'Blackflow Pro',
    planAmount: input.plan === 'monthly' ? '9,90 € / monatlich' : '79,90 € / jährlich',
    start: '01. Juni 2026',
    renewal: '01. Juli 2026',
  };
}

export async function neuesPasswort(): Promise<string> {
  await warte(600);
  return erzeugePasswort();
}