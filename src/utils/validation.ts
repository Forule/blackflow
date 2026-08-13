export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function pruefeUsername(wert: string): string {
  if (wert.trim() === '') return 'Bitte gib einen Username ein.';
  if (wert.trim().length < 3) return 'Mindestens 3 Zeichen.';
  return '';
}

export function pruefeEmail(wert: string): string {
  if (wert.trim() === '') return 'Bitte gib eine E-Mail-Adresse ein.';
  if (!EMAIL_PATTERN.test(wert)) return 'Diese E-Mail-Adresse sieht nicht gültig aus.';
  return '';
}