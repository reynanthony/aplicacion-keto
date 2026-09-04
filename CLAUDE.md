# CLAUDE.md

Guía para Claude Code en este repositorio.

## Arquitectura real (importante)

La app vivía originalmente como HTML/JS vanilla en la raíz del repo (`index.html`, `plan.html`, etc.). **Esa versión fue migrada y eliminada** (`chore: eliminar app vanilla JS — migración a Astro completada`). La app real hoy es el proyecto Astro en `web/`, desplegada en Vercel (project `ketocore`, org `reynanthonys-projects`). Dominio de producción: `keto-core.com` (comprado en GoDaddy, agregado al proyecto en Vercel) — pendiente de apuntar el DNS en GoDaddy para que resuelva; mientras tanto sigue accesible en `ketocore.vercel.app`.

La lógica del app vieja no se perdió: sigue viva en `web/public/app/*` (`supabase-client.js`, `modules/*.js`, `utils.js`) y se carga vía `<script is:inline src="/app/...">` desde `web/src/layouts/AppLayout.astro` y páginas como `web/src/pages/app/plan.astro`. No es código muerto — es la capa de datos/lógica de negocio real del app.

## Comandos

```powershell
# Sitio Astro (marketing + /app) — dentro de web/
cd web
npm run dev      # localhost:4321
npm run build    # build de produccion a web/dist/

# Deploy — el proyecto NO esta conectado por Git a Vercel, hay que desplegar manual
npx vercel --prod

# Tests legacy (Jest, sobre modulos en web/public/app/modules/*.test.js) — desde la raiz del repo
npm test

# Migraciones Supabase (proyecto KetoLab, ref lmbqzsonujwvqmfhjjgf)
npx supabase db push --linked          # aplicar migraciones nuevas de supabase/migrations/
npx supabase db advisors --linked --type security   # chequeo de seguridad en vivo (RLS, funciones, etc.)
```

## Estructura

| Carpeta | Contenido |
|---|---|
| `web/src/pages/*.astro` (fuera de `app/`) | Sitio de marketing público: home, aprender, protocolos, recetas, retos, historias, herramientas |
| `web/src/pages/app/*.astro` | Pantallas de la app (dashboard, coach, inspector, macros, plan, etc.), gateadas por `authGuard` en `AppLayout.astro` |
| `web/src/content/*` | Colecciones de contenido (articles, recipes, protocols, challenges, stories, foods, supplements) — pocas entradas hoy (1-4 cada una), pendiente de poblar antes de promocionar el sitio |
| `web/public/app/*` | Lógica JS real del app (Supabase client, generadores de plan, Keto Inspector, etc.), cargada inline desde las páginas `app/*.astro` |
| `supabase/migrations/` | Migraciones vía Supabase CLI — es el camino disciplinado hacia adelante |
| `*.sql` en la raíz (`schema-supabase.sql`, `reset-database.sql`, `supabase/schema-simple.sql`, etc.) | Schemas/seeds históricos, algunos con RLS inconsistente entre sí. **No asumir que reflejan lo que está aplicado en producción** — verificar siempre con `supabase db advisors --linked` o `supabase db query --linked` contra el proyecto real antes de tocar RLS/políticas |

## Convenciones

- Todo el texto de UI en español.
- Marca: tema oscuro (`class="dark"`), primario `#ff4d00`, acento `#ffb300`.
- `escapeHtml()` antes de insertar strings de usuario en el DOM; `safeParseJSON(value, default)` en vez de `JSON.parse` pelado (ambos en `web/public/app/utils.js`).
- Caracteres chinos sueltos en el código = encoding roto — corregirlos si aparecen.
- `web/astro.config.mjs`: sitemap excluye `/app/`, `/academia/`, `/comunidad/` (paginas privadas o sin contenido real). `SENTRY_DSN` como env var activa Sentry automáticamente en el build; sin ella el build sigue igual.
- Nunca hacer push a GitHub sin confirmación del usuario. El proyecto de Vercel no redeploya solo con el push — hay que correr `vercel --prod` (o conectar Git en Vercel) para que un push dispare deploy automático.

## Pendiente conocido (ver plan de lanzamiento)

- Monetización (Stripe/suscripciones): no implementada, requiere sesión de diseño de producto (tiers/precios) antes de programar.
- `academia/index.astro` y `comunidad/index.astro` (marketing) sin contenido real — noindex y sin enlaces en nav/footer a propósito.
- Scanner (`app/scanner.astro`) detecta código de barras real pero no tiene base de datos de productos — macros se cargan a mano.
- Colecciones de contenido (`web/src/content/`) muy escasas — trabajo de contenido, no de código.
