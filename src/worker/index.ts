import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { auth } from './routes/auth.ts';

const app = new Hono();

app.use('*', logger());
app.route('/api/auth', auth);

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Interner Serverfehler.' }, 500);
});

export default app;