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

Dominio custom `ketocore.app` pendiente de compra/conexión — hoy vive en `ketocore.vercel.app`.

## Variables de entorno

Ver `.env.example`. `SENTRY_DSN` es opcional — sin ella el build funciona igual, solo que sin monitoreo de errores.
