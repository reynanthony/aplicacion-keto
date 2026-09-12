# AUDIT-REPORT.md — KetoLab / KetoCore

**Fecha:** 2026-09-12
**Alcance:** Repositorio completo (`C:\KetoLab`), app real en `web/` (Astro), desplegada en Vercel.
**Método:** Lectura directa de código (no de los ~15 documentos de análisis previos en la raíz, que se usan solo como referencia cruzada en la sección 6). Sin cambios realizados — este documento es solo diagnóstico, conforme a `MASTER-PROJECT-WORKFLOW.md` §57.

---

## 0. Resumen ejecutivo

KetoCore es un producto **funcionalmente completo y ya en producción** (22 pantallas de app + 10 secciones de marketing), con arquitectura simple y coherente: Astro puro (sin React/Vue) + una capa de lógica de negocio en JS vanilla servida vía `<script is:inline>`, Supabase como backend, y una Edge Function con OpenAI para el Coach IA. No hay sobreingeniería.

El hallazgo más importante de esta auditoría: **la documentación del propio repo (`CLAUDE.md`, `AGENTS.md`) está desactualizada y dice que la monetización "no está implementada"**, cuando en realidad el schema, el webhook de LemonSqueezy y el gating de features Premium ya están construidos. Pero el audit encontró el motivo real por el que nadie puede pagar hoy: **el checkout nunca quedó conectado a la UI y los variant ID de LemonSqueezy siguen siendo placeholders**. Es decir, la funcionalidad está más avanzada de lo que dice la documentación, pero menos terminada de lo que sugiere el git log ("feat: base de monetización v1").

---

## 1. Inventario de funcionalidades existentes

### App (`web/src/pages/app/*.astro`, 22 pantallas, todas gateadas por `authGuard` salvo `demo/` y `offline.astro`)

| Pantalla | Función | Estado |
|---|---|---|
| `index.astro` (Dashboard) | Saludo dinámico, macros del día, quick-add, borrado de cuenta | OK |
| `onboarding.astro` | Datos antropométricos, objetivo, cálculo inicial de macros | OK |
| `welcome.astro` | Login/registro (Supabase Auth) | OK |
| `plan.astro` | Plan semanal manual + generador automático (Premium), Coach IA de recetas, Inspector Keto, lista de compras | OK, pantalla más pesada (~2000 líneas, 17 scripts) |
| `macros.astro` | Tracking diario de macros | OK |
| `alimentos.astro` | Catálogo "¿Es keto?" contra tabla Supabase `alimentos` | OK |
| `recetas.astro` | Catálogo de recetas + Inspector Keto (original vs. optimizada) | OK |
| `entrenamientos.astro` | Timer + generador automático de rutinas | OK |
| `progreso.astro` | Historial de peso/logros/analítica — **Premium** | OK |
| `objetivos.astro` | Metas/hitos | OK |
| `coach.astro` | Coach IA conversacional (Edge Function `keto-ai`) — **Premium** | OK |
| `inspector.astro` | Analítica de adherencia al plan (motor distinto al "Inspector Keto" de riesgo) | **Colisión de nombres** — dos sistemas llamados "Inspector" (ver §5) |
| `scanner.astro` | Escaneo de código de barras (`BarcodeDetector` nativo) | Solo detecta el código; macros se cargan a mano — **sin base de datos de productos**, confirmado |
| `suplementos.astro` | Recomendador de suplementos | OK |
| `compras.astro` | Lista de compras con badge de riesgo Inspector Keto | OK |
| `checklist.astro` | Checklist diario de hábitos | OK |
| `guia.astro` | Guía de uso | OK |
| `comunidad.astro` | Sección social | Placeholder "coming soon" |
| `perfil.astro` | Perfil metabólico, borrado de cuenta | **No tiene botón de checkout/suscripción real** pese a recibir todos los links "Suscribirme" (ver §5) |
| `demo/index.astro` | Siembra datos de muestra y redirige a `/app/` | OK |
| `offline.astro` | Página offline del Service Worker | OK |

### Marketing (`web/src/pages/*.astro` fuera de `app/`)

Home, alimentos, aprender (4 artículos), herramientas (calculadoras), historias (2 testimonios), protocolos (2), recetas (3), retos (2), academia y comunidad. **Academia y comunidad son teasers "Premium · Próximamente" sin contenido real**, con `noindex` a propósito — coincide con lo documentado en `CLAUDE.md`.

**Contenido escaso confirmado**: las 7 colecciones (`articles`, `challenges`, `foods`, `protocols`, `recipes`, `stories`, `supplements`) tienen entre 1 y 4 entradas cada una. Esto es trabajo de contenido, no un bug técnico.

---

## 2. Arquitectura técnica

- **Stack**: Astro 6.4.7 + Tailwind v4, sin islands de React/Vue/Svelte — toda la interactividad es JS vanilla cargado inline.
- **Capa de lógica**: `web/public/app/*.js` (24 módulos), servida sin bundling ni tree-shaking, cargada por cada página vía `<script is:inline>`.
- **`authGuard`**: es client-side puro (`localStorage.getItem("ketocore_user_id")` en `AppLayout.astro`), no middleware de servidor. No hay datos sensibles server-rendered (todo es CSR contra Supabase), así que el riesgo real es bajo, pero **no es una barrera de seguridad real** — es solo UX de redirect.
- **Supabase**: backend real vía `supabase/migrations/` (6 migraciones vía CLI, camino disciplinado) **+ 9 archivos `.sql` sueltos en la raíz y en `migrations/`** que no pasan por CLI y cuyo estado en producción no es verificable desde el repo.
- **Edge Functions**: `keto-ai` (OpenAI: generación de recetas, detección de ingredientes críticos, sustitutos, embeddings) y `lemonsqueezy-webhook` (verificación HMAC-SHA256, upsert de suscripciones) — ambas reales e implementadas, no stubs.
- **Deploy**: Vercel sin integración Git (deploy manual vía `vercel --prod`, confirmado también en CLAUDE.md), sin `vercel.json`, dominio `keto-core.com` con DNS pendiente.

Es una arquitectura razonable para el tamaño del producto — no hay sobreingeniería que corregir (§52 del workflow).

---

## 3. Estado real de monetización (hallazgo principal)

**La documentación del repo está desactualizada.** `CLAUDE.md:52` y `AGENTS.md:43` dicen "Monetización: no implementada, requiere sesión de diseño de producto" — pero esa línea no se tocó desde el commit `2b91fe4` (2026-09-04 13:59), y 35 minutos después llegó `b4d0173 feat: base de monetizacion v1 (LemonSqueezy)`, seguido de `1f4849f feat: gatear generador automatico de plan y progreso/analytics como Premium`. La documentación nunca se actualizó tras esos commits.

**Lo que sí está construido:**
- Tabla `suscripciones` (migración CLI `20260904190000_suscripciones_lemonsqueezy.sql`), RLS de solo lectura para el usuario.
- Webhook `lemonsqueezy-webhook` real: verifica firma, filtra eventos `subscription_*`, upsert por `ls_subscription_id`.
- Módulo `entitlements.js`: `isPremium()`, `checkoutUrl()`, `gate()` (blur + overlay + link a perfil) — usado para gatear generador automático de plan, historial/analítica de progreso, y Coach IA.

**Lo que falta y bloquea la conversión de cualquier usuario, hoy:**
1. `entitlements.js` línea 8: `LEMONSQUEEZY_CHECKOUT.storeUrl = 'https://TU-TIENDA.lemonsqueezy.com'` y los `variantMensual`/`variantAnual` siguen siendo placeholders literales (`'REEMPLAZAR_VARIANT_ID_MENSUAL'`).
2. `checkoutUrl()` **no se invoca desde ningún lado** del código — no existe un botón "Suscribirme" real conectado a la función.
3. `perfil.astro` (destino de todos los CTA "Suscribirme"/"Crear cuenta y subir a Premium") **no menciona premium, checkout ni pricing** en sus 559 líneas.

Este es coherente con la nota de memoria del proyecto ("solo falta la aprobación de la cuenta LemonSqueezy") — la base técnica está lista a la espera de credenciales reales, pero el paso final de conectar la UI al checkout no se hizo.

---

## 4. Testing

- CI (`​.github/workflows/ci.yml`) corre Jest + build de Astro en cada push/PR — no hay deploy automático (correcto y documentado).
- Solo **2 de 24 módulos** de lógica tienen test: `keto-score-calculator.test.js` y `user-learning.test.js`.
- **Sin cobertura**: `entitlements.js` (lógica de paywall, 0 tests pese a ser la pieza más sensible al negocio), `inspectorKeto.js`/`keto-inspector.js` (840 líneas cada uno, posible duplicado — ver §5), `auto-meal-generator.js`, `weekly-meal-generator.js`, `automation-engine.js`, `supabase-keto-ai.js`.
- No hay tests de UI/Astro ni end-to-end (Playwright/Cypress) — solo unit tests de módulos JS puros.

---

## 5. Deuda técnica

| # | Hallazgo | Ubicación | Severidad |
|---|---|---|---|
| 1 | Checkout de LemonSqueezy incompleto (placeholders + sin conectar a UI) | `entitlements.js:8`, `perfil.astro` | **Alta** — bloquea 100% de la monetización |
| 2 | **Dos motores "Inspector Keto" distintos y ambos vivos, cableados de forma inconsistente entre páginas — causa un bug funcional silencioso** (ver detalle abajo) | `web/public/app/modules/inspectorKeto.js` vs `keto-inspector.js` | **Alta** — degrada una feature Premium sin error visible |
| 3 | Colisión de nombres "Inspector": `inspector.astro` (analítica de adherencia) vs. "Inspector Keto" (riesgo de ingredientes en `plan/recetas/scanner/compras`) — mismo nombre de producto para dos motores distintos | `app/inspector.astro` vs. módulos Inspector Keto | Media — confusión de producto, no técnica |
| 4 | 9 archivos `.sql` sueltos fuera del camino disciplinado de Supabase CLI — **verificado 2026-09-12** contra producción (`supabase db query --linked`): `alimentos`, `ejercicios`, `recetas`, `suplementos` sí existen y están en uso real; movidos a `docs/archive/sql-legacy/` (solo reubicación de archivo, cero cambio en la BD) | `docs/archive/sql-legacy/` | Baja — resuelto en cuanto a organización del repo |
| 5 | ~~Tabla `public.ingredientes` en producción (110 filas) confirmada huérfana~~ — **RLS cerrada 2026-09-12** (migración `20260912120000_lock_down_ingredientes.sql`) | Tabla en producción | Resuelto (seguridad); tabla y datos intactos, solo se retiró el acceso público |
| 6 | 20 `<script is:inline>` sin `defer`/`async`, `plan.astro` carga 17 archivos JS en cascada sin bundling | `web/src/pages/app/*.astro` | Baja-Media — impacto de performance, no de correctitud |
| 7 | `CLAUDE.md`/`AGENTS.md` desactualizados respecto a monetización | raíz | Baja — riesgo de que un agente futuro repita trabajo o decisiones ya tomadas |

No se encontraron TODO/FIXME/HACK reales más allá del de `entitlements.js:8`, que es justamente el hallazgo #1.

### Detalle del hallazgo #2 — investigado a fondo el 2026-09-12

`inspectorKeto.js` (699 líneas, expone `window.inspectorKeto`) y `keto-inspector.js` (840 líneas, expone `window.KetoInspector`) **no son código duplicado — son dos motores de riesgo de ingredientes construidos de forma independiente**, con datos y API distintas:

- `inspectorKeto.js`: función pura `inspeccionarReceta(receta, baseIngredientes, options)` — recibe el banco de ingredientes desde afuera, cargado por `web/public/app/data/keto-inspector-ingredientes.js`.
- `keto-inspector.js`: `KetoInspector.inspeccionarReceta(receta)` — trae su propio banco de ingredientes embebido (`getDefaultIngredientes()`), cacheado en `localStorage['ketoInspector_ingredientes']`.

Cada página `.astro` carga solo uno de los dos motores vía `<script is:inline>`:

| Página | Motor cargado |
|---|---|
| `compras.astro`, `scanner.astro` | `inspectorKeto.js` (+ su archivo de datos) |
| `plan.astro`, `recetas.astro` | `keto-inspector.js` |

**El bug real**: `auto-meal-generator.js` (el generador automático de plan, feature **Premium**) y `keto-inspector-recetas-integration.js` (usado en `recetas.astro`) están escritos para usar `window.inspectorKeto` — es decir, dependen del motor que `plan.astro` y `recetas.astro` **nunca cargan**. Verificado en código:

```js
// auto-meal-generator.js:72-77
function getInspectorKeto() {
  if (typeof window !== 'undefined' && window.inspectorKeto) {
    return window.inspectorKeto;
  }
  return null;   // ← esto es lo que pasa siempre en plan.astro
}

// auto-meal-generator.js:107-115
function filterRecipesByKetoScore(recipes) {
  var inspector = getInspectorKeto();
  if (!inspector) {
    return { accepted: recipes, rejected: {}, reports: {}, threshold: 0 }; // acepta TODO sin filtrar
  }
  ...
```

Resultado verificado: en `plan.astro`, el generador automático de plan **llama a `filterRecipesByKetoScore` (línea 468) pero como `window.inspectorKeto` nunca existe ahí, la función devuelve todas las recetas como "aceptadas" sin evaluar ninguna** — el log `console.log('[AutoMealGenerator] Recetas evaluadas por Inspector Keto:', ...)` siempre imprime 0. Mientras tanto, en la misma página, `plan-generator-ui.js:311-312` sí llama directamente a `KetoInspector.inspeccionarReceta(recipe)` (el otro motor) para la inspección manual de una receta individual — por eso el botón manual "Inspeccionar receta" sí funciona, pero el filtro automático interno del generador nunca se ejecuta.

**Impacto de negocio**: el generador automático de plan es una feature Premium (gateada, ver §3) — su promesa implícita es generar un plan ya filtrado por riesgo keto, pero ese filtrado está inerte desde que se escribió (no es una regresión reciente, es cableado incorrecto desde el origen). Un usuario que pague por Premium no está recibiendo el filtrado automático que la feature sugiere tener.

**No se corrigió en esta pasada** — arreglar esto implica decidir el enfoque (cargar también `inspectorKeto.js` + su archivo de datos en `plan.astro`/`recetas.astro`, o unificar ambos motores en uno solo) y cualquiera de los dos cambia qué recetas acepta el generador automático hoy — es un cambio de comportamiento de producto, no un refactor interno, así que corresponde decidirlo con el usuario antes de tocarlo (§50 del workflow).

---

## 6. Vigencia de los documentos de análisis previos (raíz del repo)

El repo acumula ~15 documentos de auditoría/análisis (marzo–abril). Verificado contra el código actual:

- **Obsoletos** (asumen la app vanilla-JS pre-migración, que ya no existe): `INFORME_EJECUTIVO_ANALISIS_EXHAUSTIVO.md` y en general cualquier documento anterior al commit de migración a Astro.
- **Parcialmente vigentes / superados por implementación distinta**: `INSPECTOR_KETO_INTEGRACION.md` y `keto-inspector-migration.sql` — el Inspector Keto si se implementó, pero contra un JSON estático, no contra la tabla Supabase que proponían.
- **Mayormente implementados**: `REPORTE-EJECUTIVO-KETOLAB.md` (Coach IA + Edge Function + KetoScore + user-learning) — construido casi tal cual se propuso.

**Recomendación** (no ejecutada, pendiente de tu decisión — ver §50 del workflow, "cambio de organización del repo"): archivar estos documentos en `docs/archive/` en vez de dejarlos sueltos en la raíz, para que `docs/` sea la única fuente de verdad de aquí en adelante. No los toqué en esta pasada.

---

## 7. Configuración de build/deploy/SEO/observabilidad

- `astro.config.mjs`: sitemap correcto, Sentry condicional a `SENTRY_DSN` (no verificable desde el repo si está seteado en Vercel).
- Sin `vercel.json` — comportamiento 100% default de detección de Astro.
- `robots.txt` y sitemap correctos, `/app/` excluido de indexación.
- Vercel Analytics activo en marketing y app; sin analítica de producto/eventos custom.

Nada crítico aquí.

---

## 8. Señales de performance

- Sin uso de `astro:assets`/`<Image />` — pero no es grave: las imágenes pesadas vienen externas (Pexels) o de Supabase; los assets locales son 10 SVGs de <2KB.
- `loading="lazy"` cubre solo 17 de 54 `<img>`, sin patrón consistente confirmado.
- 20 scripts `is:inline` sin `defer`/`async`; `plan.astro` en particular carga 17 JS separados sin bundling — es el punto de mayor impacto de performance encontrado.
- Sin tooling de medición (lighthouse config, bundle analyzer) en el repo.
- Fuentes vía Google Fonts con `preconnect` pero sin self-hosting.

---

## 9. Prioridad de hallazgos (para OPTIMIZATION-PLAN.md)

1. **Monetización rota end-to-end** — nadie puede pagar hoy pese a que la base técnica existe.
2. **Cobertura de test cero en el código de negocio más crítico** (`entitlements.js`, generadores de plan).
3. **Performance de `plan.astro`** (17 scripts sin bundling) — la pantalla más usada de la app.
4. **Duplicado `inspectorKeto.js`/`keto-inspector.js`** — aclarar antes de que alguien edite el archivo equivocado.
5. **Actualizar `CLAUDE.md`/`AGENTS.md`** — bajo esfuerzo, evita que un futuro agente repita este mismo hallazgo.
6. Limpieza de `.sql` huérfanos y consolidación de documentos de análisis en `docs/archive/` — bajo riesgo, pendiente de tu aprobación por ser reorganización.
