# SQL legacy (fuera del camino CLI de Supabase)

Estos 9 archivos se movieron aquí el 2026-09-12. Son scripts SQL históricos que se corrieron manualmente contra producción en algún momento, **fuera de `supabase/migrations/`** (el camino disciplinado vía CLI). Moverlos aquí no cambia nada en la base de datos — son solo archivos de texto en el repo.

## Verificado contra producción (2026-09-12, `supabase db query --linked`)

Las tablas que estos scripts crean **sí existen en producción**: `alimentos`, `ejercicios`, `ingredientes`, `recetas`, `suplementos`.

- `alimentos`, `ejercicios`, `recetas`, `suplementos` → **en uso real**, consultadas por el frontend (`alimentos.astro`, `entrenamientos.astro`, `plan.astro`, `suplementos.astro`).
- **`ingredientes` → tabla huérfana**: 110 filas en producción, pero **ningún archivo en `web/src` ni `web/public` la consulta**. El motor real de riesgo de ingredientes (`inspectorKeto.js` / `keto-inspector.js`) usa un archivo JS estático (`web/public/app/data/keto-inspector-ingredientes.js`) o un banco embebido en el propio módulo, no esta tabla. Su RLS original era `USING (true)` (lectura pública sin restricción).

**No se borró la tabla `ingredientes` de producción** — es una acción irreversible sobre la base de datos real, así que queda pendiente de una decisión explícita del usuario (dropear la tabla vs. dejarla inerte vs. conectarla de verdad al frontend en el futuro).

`reset-database.sql`, `fix-rls.sql` y `schema-supabase.sql` son schemas/seeds de una etapa anterior, superados por las migraciones disciplinadas en `supabase/migrations/` (en particular el hardening de RLS de `20260904120000_harden_function_search_path.sql`).
