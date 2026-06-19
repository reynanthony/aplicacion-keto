# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
# Dev server (no build step)
npx http-server -p 3002 -c-1

# Run all tests
npm test

# Run a single test file
npx jest modules/keto-score-calculator.test.js

# Deploy Supabase Edge Function
npx supabase functions deploy keto-ai

# Set OpenAI key for Edge Function
npx supabase secrets set OPENAI_API_KEY=sk-...
```

## Architecture

**Stack:** Vanilla JS + HTML5, TailwindCSS via CDN, Supabase (auth + DB + Edge Functions), OpenAI via Edge Function `keto-ai`. No bundler — files are served directly.

**All UI text must be in Spanish.** Brand: dark theme (`class="dark"` on `<html>`), primary `#ff4d00`, accent `#ffb300`.

### Pages

| File | Purpose |
|---|---|
| `index.html` | Dashboard |
| `plan.html` | Meal planner + Keto Inspector (~4400 lines) |
| `recetas.html` | Recipe catalog |
| `compras.html` | Shopping list |
| `checklist.html` | Daily habits |
| `macros.html` | Macro tracking |
| `entrenamientos.html` | Workout log |
| `suplementos.html` | Supplement recommendations |
| `perfil.html` | User profile |
| `onboarding.html` | First-run setup |

### Script load order

Pages that use plan/inspector features must load scripts in this order:
1. Supabase JS SDK (CDN)
2. `supabase-client.js` — sets `window.supabase`, exposes `window.alimentosAPI`, `window.recetasAPI`, `window.auth`
3. `utils.js` — shared utilities: `safeParseJSON`, `escapeHtml`, `getLocalData`, `setLocalData`; also patches `localStorage.setItem` with XSS sanitization
4. `data/recipe-details.js` — exposes global `KETO_RECIPES` (195 recipes)
5. Feature modules (see below)

### Key modules

| File | Global | Role |
|---|---|---|
| `modules/keto-inspector.js` | `window.KetoInspector` | Analyzes ingredients for ketosis risk; `CULINARY_KNOWLEDGE` for smart replacements; `getAlternativasInteligentes()` |
| `modules/weekly-meal-generator.js` | functions on `window` | Generates 7-day plans from `KETO_RECIPES`; filters via `NON_KETO_INGREDIENTS`; reads `keto_macros` + `keto_profile` from localStorage |
| `modules/supabase-keto-intelligence.js` | `KetoSupabaseEngine` | Supabase client with full localStorage fallback; detects online/offline |
| `modules/supabase-keto-ai.js` | — | OpenAI via Edge Function; 8 built-in fallback recipes for offline |
| `modules/keto-score-calculator.js` | `KetoScoreCalculator` | 100-point keto compliance score |
| `modules/user-learning.js` | — | Feedback loop stored in localStorage |
| `modules/cloudSync.js` | `CloudSyncAdapter` | Syncs localStorage keys to Supabase on reconnect |
| `storage-manager.js` | `KetoStorageManager` | IndexedDB cache + periodic Supabase sync |
| `modules/plan-inspector-modal.js` | — | Modal UI for Inspector review after plan generation |
| `modules/plan-shopping.js` | — | Derives shopping list from weekly plan |

### Core plan generation flow

```
generateWeeklyPlanNormal()
  → analyzePlanWithInspector()
  → openPlanInspectorReviewWithPlan()   ← modal auto-opens
  → user edits via selectNewIngredient()
  → re-analyzes automatically
  → saveWeeklyPlan(weekPlan)            ← persists to localStorage
```

### Data persistence

Primary store is **localStorage**; Supabase is synced secondarily. Key names:

| Key | Contents |
|---|---|
| `keto_profile` | User profile (experience, goal, weight) |
| `keto_macros` | Daily targets (calories, protein, fat, carbs) |
| `ketoFoods` | Custom food log |
| `despensa` | Pantry items |
| `keto_weight_history` | Weight log array |
| `mealPlan_YYYY-MM-DD` | Weekly meal plan for that week |
| `checklist_YYYY-MM-DD` | Daily checklist state |
| `ketoInspector_ingredientes` | Inspector ingredient DB (version-controlled, key `ketoInspector_version`) |

### Recipe structure

```js
{ id, title, mealType, calories, protein, fat, carbs, netCarbs,
  ingredients: [{ name, quantity, unit }] }
```

Field is `ingredients` (not `ingredientes`). `mealType` values: `desayuno`, `almuerzo`, `cena`, `snacks`.

### Supabase

- Project URL: `https://lmbqzsonujwvqmfhjjgf.supabase.co`
- Anon key is set as `window.SUPABASE_ANON_KEY` in `plan.html:19`
- After schema changes, run both SQL files in the Supabase SQL Editor:
  1. `keto-inspector-migration.sql`
  2. `supabase/schema-keto-intelligence.sql`
- Tables: `alimentos`, `recetas`, `usuarios`, `datos_usuario`, `keto_ingredientes_vectors`, `keto_recetas_vectors`

## Conventions

- Chinese characters in source code = broken encoding — fix them.
- Service worker (`sw.js`) is intentionally disabled; don't re-enable without explicit intent.
- `escapeHtml()` must be used before inserting any user-derived string into the DOM.
- `safeParseJSON(value, default)` instead of bare `JSON.parse`.
- Never push to GitHub without user confirmation.
