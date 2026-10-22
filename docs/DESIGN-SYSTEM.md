# SISTEMA DE DISEÑO CANÓNICO — KetoCore

**Estado:** F0 congelado el 2026-09-25. Fuente única de verdad del sistema de diseño.
**Regla de oro:** todo componente nuevo o migrado usa SOLO lo listado en "Canónico". Nada de estilos inline con hex, nada de reintroducir sistemas viejos. Ver `docs/AUDIT-CLINICA-2026-09-25.md` para el porqué.

---

## 0. Decisión

El rediseño "Editorial Bento" (clases `kc-*` + tokens `--c-*`) es **el sistema oficial**. Los sistemas anteriores (`.btn`, `.card`, `.chip`, `.filter-btn`, `.glass-card`, `.app-card`, y los ~600 estilos inline) están **deprecados** y se migran por fases (F1–F3). Definido en `web/src/styles/global.css`.

---

## 1. Tokens de color (única fuente de verdad)

**Nunca escribir un hex directamente en una página.** Usar el token. Definidos en `global.css`:

### App (tema oscuro — `[data-theme="app"]` / `[data-theme="demo"]`)
| Token | Valor | Uso |
|---|---|---|
| `--c-bg` | `#131315` | Fondo de página |
| `--c-bg-sidebar` | `#101012` | Sidebar |
| `--c-surface` | `#161310` | **Superficie base de tarjeta** (reconciliado en F0; antes #1c1c20) |
| `--c-surface-2` | `#202024` | Tarjeta elevada / hover |
| `--c-surface-3` | `#28282d` | Elevación superior |
| `--c-primary` | `#ff4d00` | Marca |
| `--c-secondary` | `#22c55e` | Verde keto |
| `--c-border` / `--c-border-2` | `rgba(255,240,225,.06/.12)` | Bordes |
| `--c-text` / `-muted` / `-dim` / `-faint` | blanco cálido a distintas alfas | Texto |
| Semánticos | `--c-green/blue/yellow/red/purple/gold` | Estados |

### Marketing (tema claro — `:root`)
| Token | Valor |
|---|---|
| `--c-bg` | `#f4efe6` (crema) |
| `--c-surface` | `#ffffff` |
| `--c-text` | `#1a140e` |

> El marketing (tema claro) **ya usa `var(--c-surface)` correctamente** (18 usos) — no tocar. El problema de tokens es exclusivo de la app.

---

## 2. Componentes canónicos (usar SOLO estos)

| Rol | ✅ Canónico | ❌ Deprecado (migrar) |
|---|---|---|
| Botón primario | `.kc-btn` | `.btn` |
| Botón secundario | `.kc-btn-ghost` | `.btn-ghost` |
| Tarjeta base | `.kc-tile` | `.card`, `.glass-card`, `.app-card`, `.surface-card` |
| Tarjeta de sección (app) | `.kc-section-card` | `.glass-card`, `.app-card` |
| Tarjeta acento naranja | `.kc-tile-orange` | tarjetas con gradiente inline |
| Chip / filtro | `.kc-chip` (adoptar — hoy 0 usos) | `.chip`, `.filter-btn` |
| Badge semántico | `.kc-badge` + `-green`/`-amber`/`-red` | badges de color inline |
| Título de página | `.kc-h1` + `.kc-sub` + `.kc-eyebrow` | headings inline |
| Número métrico | `.kc-num` | fuentes inline |
| Grid de página | `.kc-page` + `.kc-grid` | grids `@media` inline por página (→ F1) |

---

## 3. Reglas para código nuevo

1. **Cero hex inline.** Si necesitas un color, es un token. Si el token no existe, se añade a `global.css`, no al `style=`.
2. **Cero `!important` nuevo.** Los 95 actuales son deuda a eliminar en F2, no un patrón a copiar.
3. **Layout compartido, no por página.** No reinventar el grid con `@media` inline (causa raíz de las regresiones tipo `f0c80eb`). Usar el layout de F1 cuando exista.
4. **Comportamiento en listeners, no `onclick=` inline** (476 actuales a migrar gradualmente).
5. Antes de crear una clase de tarjeta/botón nueva: **ya existe una canónica** — úsala.

---

## 4. Estado de migración por fases

| Fase | Objetivo | Estado |
|---|---|---|
| **F0** | Congelar sistema canónico + reconciliar `--c-surface` | ✅ 2026-09-25 |
| **F1** | Layout de app compartido (matar grids inline por página) | ⏳ pendiente |
| **F2** | Tokenizar los 573 hex inline + eliminar `!important` innecesarios | ⏳ pendiente |
| **F3** | Componentizar tarjetas/modales/headers repetidos (`.astro`) | ⏳ pendiente |
| **F4** | Contenido + tests | ⏳ pendiente (paralelo) |

Progreso medible (baseline 2026-09-25): `.btn` 97 · `.glass-card` 121 · `.chip` 46 · `.filter-btn` 24 · hex inline 573 · `!important` 95 · `onclick=` inline 476. **Meta: todos a 0 salvo lo canónico.**
