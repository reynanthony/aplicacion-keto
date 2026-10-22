# AUDITORÍA CLÍNICA — KetoCore / KetoLab

**Fecha:** 2026-09-25
**Alcance:** Diseño visual + funciones + implementación + herramientas.
**Método:** Lectura directa de código + build real + medición cuantitativa (grep). Sin cambios en el código — documento diagnóstico, conforme a `MASTER-PROJECT-WORKFLOW.md`.
**Contexto:** Continúa y actualiza `docs/AUDIT-REPORT.md` (2026-09-12). Desde entonces hubo trabajo real (checkout LemonSqueezy conectado, Inspector Keto arreglado, varios "fixes de diseño"). Esta auditoría responde a la verificación pre-lanzamiento que detectó "muchos errores, inconsistencias visuales y diseño no adecuado".

---

## 0. Veredicto en una línea

**La app NO está rota — está sin terminar de pulir.** El build compila limpio (43 páginas), el backend es real, la lógica de negocio funciona y la monetización ya está cableada. **El problema NO es el producto ni la arquitectura de datos — es la capa de presentación**, que quedó fragmentada en 3+ sistemas de diseño solapados y ~600 estilos inline hardcodeados. No hay que reestructurar el planteamiento del producto; hay que **consolidar el sistema de diseño y refactorizar la capa visual**. Rehacer todo desde cero tiraría a la basura backend, Edge Functions y lógica que ya sirven.

---

## 1. Lo que SÍ funciona (no tocar)

| Área | Estado | Evidencia |
|---|---|---|
| Build de producción | ✅ Limpio, 43 páginas en ~12s | `astro build` sin errores ni warnings |
| Backend Supabase | ✅ Real, con migraciones CLI + RLS | 6 migraciones disciplinadas |
| Coach IA (Edge Function `keto-ai`) | ✅ Real, OpenAI | no es stub |
| Monetización LemonSqueezy | ✅ **Ya conectada** (resuelto desde el audit anterior) | `entitlements.js:12-13` tiene variant UUID reales; commits `b19e6be`, `022e76c`, `4606457` |
| Inspector Keto (filtro automático) | ✅ **Arreglado** | commit `586d14e` |
| Encoding | ✅ Sin mojibake / caracteres chinos rotos | grep limpio |

**Conclusión:** la mitad "invisible" del producto (datos, lógica, pagos) está en mejor estado de lo que sugiere la queja. El fallo está en lo que el usuario ve.

---

## 2. Diagnóstico de DISEÑO (la causa raíz de la queja) — SEVERIDAD ALTA

### 2.1 Tres sistemas de diseño conviviendo, ninguno aplicado por completo

El rediseño "Editorial Bento" (`kc-*` en `global.css`) se aplicó **a medias**. La mayoría de la app sigue con los sistemas anteriores. Medido por número de usos en `src/pages`:

| Componente | Sistema viejo | Sistema intermedio | Sistema nuevo (`kc-*`) |
|---|---|---|---|
| **Tarjetas** | `.card`/`.surface-card` (~250) | `.glass-card` (121) + `.app-card`/`.modal-card` (por página) | `.kc-tile`/`.kc-section-card` (28) |
| **Botones** | `.btn` (97) | — | `.kc-btn` (21) |
| **Chips/filtros** | `.chip` (46) + `.filter-btn` (24) | — | `.kc-chip` (**0 usos — código muerto**) |

**Impacto:** el mismo elemento (una tarjeta, un botón, un chip) se ve distinto según la pantalla, porque hay tres fuentes de verdad y no una. Esto es exactamente lo que se percibe como "inconsistencia visual".

### 2.2 El color base ni siquiera es consistente

- Token canónico en `@theme`: `--c-surface: #1c1c20`.
- Valor realmente usado en las pantallas: `#161310` **hardcodeado 69 veces**.
- Uso del token `var(--c-surface)`: solo **22 veces**.

Es decir: **la superficie de las tarjetas tiene dos colores distintos** (`#1c1c20` teórico vs `#161310` real) y el token que debería unificarlos se ignora 3 de cada 4 veces.

### 2.3 ~600 estilos inline hardcodeados

- **573** atributos `style="…#hex…"` con color hardcodeado en `src/pages/app`.
- El **dashboard** (`index.astro`) solo tiene **257 atributos `style=`**.
- **95** `!important` repartidos en las pantallas de app.

Cambiar un color de marca hoy exige buscar y reemplazar en cientos de sitios, no editar un token. Esto hace el pulido visual lento y propenso a regresiones (ver §2.5).

### 2.4 Tailwind de tema-claro parchado a oscuro con `!important`

En `index.astro:53-58` hay overrides como:
```css
.hover\:bg-orange-50:hover { background-color: rgba(255,77,0,0.08) !important; }
.hover\:bg-gray-100:hover  { background-color: rgba(255,240,225,0.06) !important; }
```
Se usan clases utilitarias de Tailwind diseñadas para fondo claro (`bg-orange-50`, `hover:bg-gray-100`, `bg-red-50`…) y luego se anulan a mano para el tema oscuro. Señal clara de que la UI se escribió para claro y se "oscureció" a parches — origen de fallos de contraste sueltos.

### 2.5 Ciclo de "whack-a-mole" visual (síntoma, no causa)

Los últimos commits son sintomáticos:
- `55b2bfa fix: 3 bugs de diseño de escritorio encontrados en auditoría visual`
- `f0c80eb fix: regresión en el fix del grid de Objetivos (header aplastado)` ← **un fix que rompió otra cosa**

Los comentarios en `index.astro:77-108` documentan una historia de apagar incendios de layout uno por uno (`min-width:0`, grid que se estira, `max-width` topado). Cuando arreglar un grid rompe otro, el problema no es cada bug — es que **no hay un sistema de layout compartido**; cada página reinventa su grid inline.

### 2.6 `class="dark"` vestigial

Ambos layouts (`Layout.astro:25`, `AppLayout.astro:16`) llevan `class="dark"` en `<html>`, pero el proyecto conmuta tema con `data-theme`, no con la clase `dark` de Tailwind. Es ruido inofensivo pero confirma capas de decisiones a medio migrar.

---

## 3. Diagnóstico de IMPLEMENTACIÓN / CÓDIGO — SEVERIDAD MEDIA

| # | Hallazgo | Evidencia | Impacto |
|---|---|---|---|
| 1 | **Páginas monolíticas** — 18.710 líneas de `.astro` en 22 pantallas, con casi nula reutilización de componentes (solo 3 componentes `.astro` para 43 páginas) | `plan.astro` 3.470 líneas, `entrenamientos.astro` 3.263, `index.astro` 2.405 | Cada pantalla es un silo; un cambio de patrón hay que replicarlo a mano N veces → fuente directa de la inconsistencia |
| 2 | **476 `onclick=` inline** en vez de listeners | grep en `src/pages/app` | Frágil, no testeable, mezcla marcado y comportamiento |
| 3 | JS servido crudo vía `<script is:inline>`, sin bundling/tree-shaking; `plan.astro` carga ~17 archivos en cascada | ya señalado en audit anterior §8 | Performance de la pantalla más usada |
| 4 | Fuentes vía `@import` de Google Fonts (render-blocking) | `global.css:1-2` | Bloquea el primer render; self-hosting pendiente |
| 5 | `authGuard` 100% client-side (`localStorage`) | `AppLayout.astro:22` | No es barrera de seguridad, solo UX (riesgo bajo: todo es CSR) |
| 6 | Cobertura de tests: **2 de 24 módulos** | audit anterior §4 | Lógica de negocio crítica sin red de seguridad |

---

## 4. Contenido (bloqueante de lanzamiento, no técnico)

- Colecciones (`src/content/*`) con **1–4 entradas cada una**: 4 artículos, 3 recetas, 2 protocolos, 2 retos, 2 historias, 3 alimentos, 1 suplemento.
- `academia` y `comunidad` (marketing) son teasers "Próximamente" con `noindex`.
- Scanner detecta código de barras pero **no tiene base de datos de productos** — macros a mano.

Lanzar una plataforma "de salud metabólica más completa" con este volumen de contenido se sentiría vacío. **Es trabajo de contenido, no de código, pero es un bloqueante real de percepción de calidad.**

---

## 5. Respuesta a la pregunta estratégica: ¿cambiar o reestructurar?

**Recomendación: NO reestructurar el planteamiento. Consolidar.**

Reescribir desde cero significaría tirar backend Supabase, Edge Functions, monetización cableada, Inspector Keto y toda la lógica de generación de plan/rutinas — todo lo que **ya funciona**. El problema está confinado a dos capas tratables:

1. **Sistema de diseño** (unificar los 3 sistemas en uno, tokenizar los ~600 estilos inline).
2. **Estructura de las páginas** (extraer componentes reutilizables para que el patrón viva en un solo sitio).

Esto se puede hacer **incrementalmente, sin parar la app**, y respeta la regla del proyecto: el rediseño es estético, no se quita funcionalidad ([[feedback_ketolab_v3_scope]]).

### Plan de saneamiento propuesto (por fases, orden de mayor ROI)

| Fase | Qué | Por qué primero |
|---|---|---|
| **F0 — Congelar el sistema** | Elegir UNO de los tres sistemas de tarjeta/botón/chip como canónico (recomiendo `kc-*`, es el más nuevo y coherente), borrar `.kc-chip` muerto o adoptarlo, y arreglar el token `--c-surface` para que valga `#161310` (o migrar todo a `#1c1c20`, decidir uno) | Sin una fuente de verdad, cualquier pulido se vuelve whack-a-mole otra vez |
| **F1 — Layout compartido** | Extraer el grid/página de app a un componente/utilidad única (hoy cada página reinventa su `@media` y su grid inline) | Mata la clase de bugs de §2.5 de raíz |
| **F2 — Tokenizar** | Reemplazar los 573 hex inline por tokens; quitar los 95 `!important` que dejen de hacer falta | Hace que el color de marca se cambie en un sitio |
| **F3 — Componentizar** | Sacar tarjetas/modales/headers repetidos a componentes `.astro`; empezar por el dashboard (peor ofensor) y `plan.astro` | Reduce 18k líneas y previene divergencia futura |
| **F4 — Contenido + tests** | Poblar colecciones a un mínimo creíble; tests a `entitlements.js` y generadores | Bloqueantes de lanzamiento reales |

**Estimación de criterio:** F0–F2 son el 80% de la percepción de "inconsistencia" y son mecánicas (bajo riesgo, alto impacto visual). F3 es más grande pero se puede hacer pantalla por pantalla. F4 es paralelo y no bloquea a las demás.

---

## 6. Qué NO hacer

- **No** reescribir en React/otro framework "para hacerlo bien" — la arquitectura Astro + JS vanilla es razonable para el tamaño; el problema es disciplina de diseño, no el stack ([[project_ketolab]]).
- **No** seguir arreglando bugs visuales uno por uno antes de hacer F0 — cada fix aislado arriesga otra regresión como `f0c80eb`.
- **No** apuntar el DNS ni promocionar el dominio hasta cerrar al menos F0–F2 y F4-contenido.

---

## 7. Resumen para decisión

| Dimensión | Estado | Acción |
|---|---|---|
| Producto / concepto | Sólido | Mantener |
| Backend / datos / pagos | Funciona | Mantener |
| **Diseño visual** | **Fragmentado (3 sistemas)** | **Consolidar (F0–F2)** |
| **Estructura de páginas** | **Monolítica** | **Componentizar (F3)** |
| Contenido | Escaso | Poblar (F4) |
| Tests | 2/24 | Ampliar (F4) |
| ¿Reestructurar de cero? | **No justificado** | Saneamiento incremental |
