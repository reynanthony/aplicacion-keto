# AGENTS.md — KetoLab (KetoCore)

## Arquitectura real (importante)

La app vivía originalmente como HTML/JS vanilla en la raíz del repo (`index.html`, `plan.html`, etc.). **Esa versión fue migrada y eliminada.** La app real hoy es el proyecto Astro en `web/`, desplegada en Vercel (project `ketocore`, org `reynanthonys-projects`). Dominio de producción: `keto-core.com` (GoDaddy, agregado al proyecto en Vercel) — pendiente de apuntar el DNS; mientras tanto sigue accesible en `ketocore.vercel.app`.

La lógica del app vieja no se perdió: sigue viva en `web/public/app/*` (`supabase-client.js`, `modules/*.js`, `utils.js`) y se carga vía `<script is:inline src="/app/...">` desde `web/src/layouts/AppLayout.astro` y páginas como `web/src/pages/app/plan.astro`.

## Comandos

```powershell
cd web
npm run dev      # localhost:4321
npm run build    # build de produccion a web/dist/

npx vercel --prod   # deploy manual — el proyecto NO esta conectado por Git a Vercel

npm test   # desde la raiz del repo, Jest sobre web/public/app/modules/*.test.js

npx supabase db push --linked
npx supabase db advisors --linked --type security
```

## Estructura

| Carpeta | Contenido |
|---|---|
| `web/src/pages/*.astro` (fuera de `app/`) | Sitio de marketing público |
| `web/src/pages/app/*.astro` | Pantallas del app, gateadas por `authGuard` en `AppLayout.astro` |
| `web/src/content/*` | Colecciones de contenido — pocas entradas hoy, pendiente de poblar |
| `web/public/app/*` | Lógica JS real del app (Supabase, generadores de plan, Keto Inspector) |
| `supabase/migrations/` | Migraciones vía Supabase CLI — camino disciplinado hacia adelante |
| `*.sql` en la raíz / `supabase/schema-simple.sql` | Schemas/seeds históricos con RLS inconsistente entre sí — no asumir que reflejan producción, verificar con `supabase db advisors --linked` |

## Convenciones

- Todo el texto de UI en español. Tema oscuro, primario `#ff4d00`, acento `#ffb300`.
- `escapeHtml()` / `safeParseJSON()` (en `web/public/app/utils.js`) para todo lo derivado de input de usuario.
- Nunca hacer push a GitHub sin confirmación del usuario. Un push no dispara deploy automático (sin integración Git en Vercel) — hace falta `vercel --prod`.

## Pendiente conocido

- Monetización: no implementada, requiere definir tiers/precios antes de programar.
- `academia/` y `comunidad/` (marketing) sin contenido real — noindex a propósito.
- Scanner sin base de datos de productos — macros a mano.
- Colecciones de contenido escasas — trabajo de contenido, no de código.
