// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

// Sentry solo se activa si SENTRY_DSN esta configurado (Vercel > Settings > Environment Variables).
// Sin DSN, el build sigue igual que antes — no hace falta tocar este archivo cuando se agregue la key.
const sentryDsn = process.env.SENTRY_DSN;

export default defineConfig({
  site: 'https://ketocore.app',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/app/') && !page.includes('/academia/') && !page.includes('/comunidad/'),
    }),
    ...(sentryDsn ? [sentry({ dsn: sentryDsn })] : []),
  ],
  vite: {
    plugins: [tailwindcss()],
  }
});
