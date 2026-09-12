# OPTIMIZATION-PLAN.md — KetoLab / KetoCore

**Basado en:** `AUDIT-REPORT.md` (2026-09-12)
**Estado:** Propuesta — nada de esto se ha ejecutado. Requiere tu aprobación por ítem antes de tocar código, según `MASTER-PROJECT-WORKFLOW.md` §50 (cambios de producto, negocio o irreversibles).

---

## BASELINE

Punto de partida verificado en código real (no en documentación, que estaba desactualizada):

- App funcionalmente completa: 22 pantallas de producto + 10 de marketing, en producción.
- Monetización: schema + webhook + gating **construidos**, pero checkout **no conectado** — conversión real = 0% posible hoy.
- Testing: 2 de 24 módulos de lógica con test (8% de cobertura de módulos).
- Performance: sin bundling de JS en `/app/`, `plan.astro` carga 17 scripts por separado.
- Repo: 9 SQL huérfanos fuera del camino CLI, ~15 documentos de análisis sin consolidar, docs de agente (`CLAUDE.md`/`AGENTS.md`) desactualizados en al menos un punto crítico (monetización).

---

## PROBLEMS (de AUDIT-REPORT.md §9, con causa raíz)

| # | Problema | Causa raíz | Impacto |
|---|---|---|---|
| P1 | Nadie puede pagar | Variant IDs de LemonSqueezy son placeholders + `checkoutUrl()` nunca se llama desde la UI | Bloquea 100% del revenue |
| P2 | Código de negocio crítico sin test | `entitlements.js`, generadores de plan y Coach IA se escribieron sin tests | Riesgo de romper gating/paywall en el próximo cambio sin darse cuenta |
| P3 | `plan.astro` pesado | 17 `<script is:inline>` sin bundling, sin defer | Mayor tiempo de carga en la pantalla más usada |
| P4 | **Generador automático de plan (Premium) no filtra por riesgo keto** | `auto-meal-generator.js` depende de `window.inspectorKeto`, que `plan.astro` nunca carga (esa página solo carga el otro motor, `keto-inspector.js`) — el filtro devuelve todas las recetas como "aceptadas" sin evaluar ninguna | **Alto** — feature de pago no cumple lo que promete, en silencio, sin error visible |
| P5 | Documentación de agente desactualizada | `CLAUDE.md`/`AGENTS.md` no se tocaron tras el commit de monetización | Un futuro agente (o tú) puede asumir que falta algo que ya existe |
| P6 | Repo desordenado | 9 SQL sueltos + ~15 docs de análisis en la raíz sin curar | Dificulta saber qué es vigente vs. histórico |

---

## PRIORITY

Orden por impacto de negocio y riesgo, no por facilidad:

1. **P1 — Monetización** (bloquea revenue; requiere datos que solo tú tienes: store URL y variant IDs reales de LemonSqueezy)
2. **P4 — Generador automático de plan no filtra por riesgo keto** (feature Premium rota en silencio — investigado y confirmado 2026-09-12, ver AUDIT-REPORT.md §5; falta decidir el fix)
3. ~~P5 — Actualizar CLAUDE.md/AGENTS.md~~ **hecho 2026-09-12**
4. **P2 — Tests de `entitlements.js`** — **hecho 2026-09-12** (17 tests, suite completa 53/53 verde)
5. **P3 — Bundling/defer de `plan.astro`** (mejora medible, sin urgencia de negocio)
6. ~~P6 — Limpieza de repo~~ **hecho 2026-09-12** (21 documentos de análisis movidos a `docs/archive/`, con README explicando qué es cada cosa)

---

## PLAN

### P1 — Cerrar el ciclo de monetización
**Necesito de ti antes de tocar código:**
- Store URL real de LemonSqueezy (reemplaza `'https://TU-TIENDA.lemonsqueezy.com'`).
- Variant ID mensual y anual reales (reemplaza los dos placeholders `'REEMPLAZAR_VARIANT_ID_...'`).
- Confirmación de que la cuenta de LemonSqueezy ya está aprobada (tu nota anterior decía que esto era el único bloqueante pendiente).

**Con esos datos, el trabajo de código es:**
- Completar `entitlements.js` con los valores reales.
- Añadir el botón "Suscribirme" en `perfil.astro` (o donde definas que debe vivir la conversión) que llame a `KetoEntitlements.checkoutUrl()`.
- Probar el flujo completo contra el webhook en un entorno de prueba de LemonSqueezy antes de dar por cerrado.

*No tocaré nada de esto hasta tener los datos reales — no voy a inventar variant IDs ni URLs.*

### P5 — Actualizar CLAUDE.md / AGENTS.md — HECHO
Reescrita la sección "Pendiente conocido" en ambos archivos para reflejar el estado real de monetización y el hallazgo de los dos motores Inspector.

### P4 — Generador automático de plan no filtra por riesgo keto — HECHO (opción a)
Diagnóstico completo en `AUDIT-REPORT.md` §5. Aplicado el arreglo mínimo: agregadas las cargas de `data/keto-inspector-ingredientes.js` + `modules/inspectorKeto.js` en `plan.astro` (antes de `auto-meal-generator.js`) y en `recetas.astro` (antes de `keto-inspector-recetas-integration.js`), respetando el mismo orden que ya usaban `compras.astro`/`scanner.astro`. `keto-inspector.js` (`KetoInspector`) se dejó intacto — sigue siendo el motor que usa `plan-generator-ui.js` para la inspección manual de una receta. `npm run build` (Astro) corrió limpio, 43 páginas generadas, sin errores; verificado en el HTML compilado que el orden de scripts quedó correcto.

**Opción (b)** (unificar ambos motores en uno solo) queda como refactor futuro separado, no era necesario para destrabar el bug — no se tocó nada de la lógica interna de ninguno de los dos motores.

### P2 — Tests de `entitlements.js` — HECHO
17 tests unitarios (`web/public/app/modules/entitlements.test.js`) cubriendo `getSuscripcion` (caché/forceRefresh/error), `isPremium` (todos los estados), `checkoutUrl` (mensual/anual, con/sin usuario) y `gate` (bloqueo visual + banner). Suite completa: 53/53 tests verdes.

### P3 — Performance de `plan.astro`
Opciones a decidir contigo (esto sí es una decisión de arquitectura, no solo "optimización interna"):
- (a) Añadir `defer` a los 17 `<script is:inline>` — cambio mínimo, bajo riesgo, mejora parsing.
- (b) Consolidar/bundlear los módulos con Vite (más trabajo, pero elimina 17 requests HTTP) — cambio de arquitectura de carga, mayor riesgo de romper el orden de dependencia entre scripts.
Recomiendo empezar por (a) y medir antes de considerar (b).

### P6 — Limpieza de repo — HECHO
Movidos los 21 `.md` de análisis + los 9 `.sql` sueltos de la raíz (y la carpeta `migrations/` suelta, ahora vacía y eliminada) a `docs/archive/` y `docs/archive/sql-legacy/` respectivamente (con `git mv`, historia preservada), cada uno con su propio `README.md` explicando qué es y su vigencia real.

Verificado contra producción con `supabase db query --linked` antes de mover nada: las tablas `alimentos`, `ejercicios`, `recetas`, `suplementos` sí están en uso real por el frontend.

### `public.ingredientes` — HECHO (hardening, sin borrar datos)
Confirmado que la policy RLS real era `cmd ALL, roles {public}, qual true, with_check null` — es decir, cualquiera con la anon key podía leer, insertar, actualizar y borrar filas sin restricción (peor que "solo lectura pública", que es lo que se sospechaba inicialmente). Verificado también que ninguna Edge Function ni código del frontend consulta esta tabla por nombre. Se aplicó la migración `supabase/migrations/20260912120000_lock_down_ingredientes.sql` (`DROP POLICY ingredientes_all`), vía el camino disciplinado CLI (`supabase db push --linked`) — verificado post-aplicación que ya no hay ninguna policy sobre la tabla, así que con RLS habilitado el acceso queda restringido a `service_role`. **No se borró la tabla ni sus 110 filas** — sigue disponible por si más adelante se decide conectarla de verdad al frontend en vez del JSON estático actual.

---

## Qué necesito de ti para avanzar

1. ¿Tienes los datos reales de LemonSqueezy (store URL + variant IDs) para cerrar P1, o seguimos esperando la aprobación de la cuenta? Esto sigue bloqueado — no hay forma de avanzarlo sin esos datos.
2. Todo lo de código/DB ya está commiteado y pusheado a `origin/main`. Falta el deploy real: `vercel --prod` (el proyecto no redeploya solo con el push a GitHub). ¿Lo corro?
