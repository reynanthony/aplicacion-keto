# KetoLab (KetoCore) — Guide

## Project

Spanish-language vanilla JS PWA for keto diet meal planning. Multi-page, no framework. TailwindCSS via CDN. Supabase + OpenAI (with offline fallback). All text in Spanish.

## Brand
- Primary: `#ff4d00` (orange), `#ffb300` (gold)
- Dark theme (`class="dark"` on `<html>`)

## Pages

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Dashboard |
| `/plan.html` | `plan.html` (4427 lines) | Meal planner, inspector |
| `/compras.html` | `compras.html` | Shopping list |
| `/recetas.html` | `recetas.html` | Recipe catalog |
| `/checklist.html` | `checklist.html` | Daily habits |

## Dev server

```powershell
npx http-server -p 3002 -c-1
```

## Key modules

- `data/recipe-details.js` — 195 recipes, exposes global `KETO_RECIPES`
- `modules/weekly-meal-generator.js` — Plan generator, reads `KETO_RECIPES`, has `NON_KETO_INGREDIENTS` filter
- `modules/keto-inspector.js` — Analyzes ingredients, `CULINARY_KNOWLEDGE` for smart replacements, exposes `window.KetoInspector`
- `modules/supabase-keto-intelligence.js` — Supabase client with localStorage fallback
- `modules/supabase-keto-ai.js` — OpenAI via Edge Function with 8 pre-defined fallback recipes
- `modules/user-learning.js` — localStorage feedback system
- `modules/keto-score-calculator.js` — 100-point keto scoring

## Architecture

```
Generator → KetoInspector → Modal (review) → Apply changes → Re-analyze → Shopping list
```

Flow: `generateWeeklyPlanNormal()` → `analyzePlanWithInspector()` → `openPlanInspectorReviewWithPlan()` → user changes via `selectNewIngredient()` → re-analyzes automatically

## Supabase

- URL: `https://lmbqzsonujwvqmfhjjgf.supabase.co`
- Anon key set in `plan.html:19` as `window.SUPABASE_ANON_KEY`
- Edge Function `keto-ai` at `/functions/v1/keto-ai`
- All Supabase modules detect offline and fallback to localStorage

## SQL in Supabase

After schema changes, both files must execute in Supabase SQL Editor:
1. `keto-inspector-migration.sql` (ingredients table)
2. `supabase/schema-keto-intelligence.sql` (tables: feedback, planes, perfil, vectors)

## JSON fields use `ingredients` (not `ingredientes`)

Recipe structure: `{ id, title, mealType, calories, protein, fat, carbs, netCarbs, ingredients: [{ name, quantity, unit }] }`

## Conventions

- Chinese characters in source = broken; fix them
- `saveWeeklyPlan(weekPlan)` persists to localStorage
- `loadWeeklyPlan()` reads from localStorage
- Inspector modal auto-opens after generation
- Use `KetoInspector.getAlternativasInteligentes()` for culinary-aware replacements
- Never push to GitHub without confirmation

## Dev commands

- `npx http-server -p 3002 -c-1` — start server
- `npx supabase functions deploy keto-ai` — deploy Edge Function
- `npx supabase secrets set OPENAI_API_KEY=sk-...` — set OpenAI key
