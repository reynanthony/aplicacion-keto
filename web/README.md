# KetoCore (web/)

Sitio Astro de KetoLab/KetoCore: marketing público + la app (`/app/*`). Ver `../CLAUDE.md` (raíz del repo) para arquitectura completa, incluyendo la lógica legacy en `public/app/*`.

## Comandos

```powershell
npm install
npm run dev      # localhost:4321
npm run build    # build de produccion a dist/
npm run preview  # sirve dist/ localmente
```

## Deploy

El proyecto de Vercel (`ketocore`, org `reynanthonys-projects`) **no está conectado por Git** — un `git push` no dispara deploy automático. Para desplegar:

```powershell
npx vercel --prod
```

Dominio custom `keto-core.com` (comprado en GoDaddy) ya está agregado al proyecto en Vercel. Falta apuntar el DNS en GoDaddy (registro `A @ 76.76.21.21`, o cambiar nameservers a `ns1.vercel-dns.com`/`ns2.vercel-dns.com`) para que quede resuelto. Mientras tanto sigue viviendo en `ketocore.vercel.app`.

## Variables de entorno

Ver `.env.example`. `SENTRY_DSN` es opcional — sin ella el build funciona igual, solo que sin monitoreo de errores.
