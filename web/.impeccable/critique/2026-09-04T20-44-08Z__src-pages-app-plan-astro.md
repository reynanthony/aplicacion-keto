---
target: app/plan.astro (meal plan generator)
total_score: 18
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 1
target_identity: "file:C:\\KetoLab\\web\\src\\pages\\app\\plan.astro"
target_fingerprint: "sha256:bfb8e0d554e7c027e0c558f322fbaaab785e2f3bd6d3f7f9ee5bfe8ad3fbb574"
target_path: "C:\\KetoLab\\web\\src\\pages\\app\\plan.astro"
timestamp: 2026-09-04T20-44-08Z
slug: src-pages-app-plan-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector+evidence sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2/4 | Real AI path does 28 sequential calls behind a static spinner, no progress |
| 2 | Match System/Real World | 3/4 | Strong keto vocabulary throughout |
| 3 | User Control and Freedom | 1/4 | No Escape close on ~15 modals; no cancel during generation; success modal force-dismisses at 3500ms |
| 4 | Consistency and Standards | 1/4 | 4 functions declared twice in this file, silently overridden |
| 5 | Error Prevention | 2/4 | Auto-mode has good error states; AI weekly path swallows failures silently |
| 6 | Recognition Rather Than Recall | 2/4 | acceptRecipeAsIs() does not persist, review state lost on reopen |
| 7 | Flexibility and Efficiency | 3/4 | Good primitives (ingredient/recipe swap, copy day) undercut by the copy-plan bug |
| 8 | Aesthetic and Minimalist Design | 1/4 | 4 separate "generate plan" entry points compete before user does anything |
| 9 | Error Recovery | 2/4 | Auto-mode specific/actionable; AI path just says "error, try again" with no cause |
| 10 | Help and Documentation | 1/4 | No tooltip explains nivel_seguridad/threshold/puntaje_keto anywhere |
| Total | | 18/40 | Poor (45%) |

## Design Specificity Verdict
Domain modeling is genuinely keto-specific (NON_KETO_INGREDIENTS exclusion list, Inspector with nivel_seguridad/puntaje_keto/carb threshold, carbs-per-ingredient audit table). Slips generic structurally: two unrelated "auto-generate" systems run in parallel (AI weekly planner with full Inspector review, and a same-day pantry-based Automatico mode with no Inspector UI at all) sharing the same sparkle icon and near-identical copy.
CLI detector: exit 2, 12 findings (side-tab x5, border-accent-on-rounded x1, overused-font x1, ai-color-palette x3 - purple/violet gradient flagged as generic-AI-tool aesthetic, layout-transition x2, broken-image x1). Same coverage-gap caveat (no html/head tags) applies.
Static read found 43 inline styles, and confirmed the invented-color anti-pattern from app/index.astro is NOT contained to one file: plan.astro repeats two exact invented hexes (#ea580c, #4ade80) and adds its own expanded invented palette (#f59e0b, #db2777, #7c3aed, #a855f7, #9c27b0, #ff9800, #84cc16, #6b7280, #ff7351, #ffc107) - a spreading anti-pattern across the app, not a one-off.
Visual overlays: unavailable, no browser automation tool exposed this session.

## Overall Impression
This is the product's core value-prop screen and it scored worst of the three. The dashboard's real-bug pattern (duplicate function silently breaking a feature) repeats here 4 times in one file, plus a button wired to a function that does not exist anywhere in the codebase. Ingredient-swap UX is genuinely well thought out, but a user who generates a weekly AI plan cannot see it again from "Semana," and "Copiar Plan" is permanently broken with a misleading error message.

## What's Working
- Ingredient-level swap (replaceIngredient -> alternatives modal -> automatic re-analysis) - fixes one flagged item without discarding the recipe, correctly clears stale analysis
- Auto-mode pantry generator's error states (empty pantry, critical risk, rejected recipes) - specific, keto-literate, actionable
- Plan-activation success modal - real emotional payoff (pulse animation, per-day kcal/carb summary) instead of a flat toast

## Priority Issues
[P0] Duplicate functions break weekly review and Copy Plan; a button calls an undefined function - openWeeklyModal()/renderMealPlan()/resetPlan()/copyPlan() each declared twice; later "patch block" (lines ~3456-3527) silently overrides the earlier, more complete versions. The surviving openWeeklyModal() never populates the copy-from/copy-to selects, so copyDayPlan() always reads empty values and always shows a misleading "select different days" error. Separately, the Inspector's "Ver analisis completo" button calls openPlanInspectorReview(), which is not defined anywhere in the codebase - guaranteed ReferenceError on click. Fix: delete the duplicate patch block or merge deliberately; define or remove the dead button. Suggested: $impeccable harden

[P1] Unbounded, unmonitored, uncancelable AI generation for the core action - generateWeeklyPlanWithAI() awaits 28 sequential AI calls behind one static spinner, no progress, no cancel; individual failures swallowed silently (catch(e){}) so a meal can simply be missing with no flag. Fix: stream progress, add cancel with graceful fallback, surface failed meals explicitly in review. Suggested: $impeccable clarify

[P2] Copy/reality mismatch: "IA" branding on a path with no AI - generateWeeklyPlanAI() falls back to local rule-based generateWeeklyPlanNormal() when AI is not available, wrapped in an artificial 1500ms delay, but the loading modal still says "Creando recetas unicas con IA"; silent AI-failure fallback does the same with zero notice. Fix: gate the "con IA" copy behind confirmed AI availability, or make copy true for both paths, notify on silent fallback. Suggested: $impeccable clarify

[P2] Zero keyboard/screen-reader access to the core swap interaction - Inspector's flagged-ingredient rows and alternative picker rows are div onclick with no role/tabindex/aria-*; only 3 aria-* attributes in the whole 3565-line file, all in the header, zero across ~15 modals. Fix: convert to real buttons or add role=button tabindex=0 + keydown handling, global Escape listener, focus management on modal open. Suggested: $impeccable harden

[P3] Two competing, visually-identical "generate" systems - Automatico panel (Premium, single-day, pantry-based, no Inspector review) and the AI weekly system (free tier, 7-day, full Inspector review) share the same sparkle icon and near-identical labels. Fix: rename/reskin distinctly, or fold Automatico into a mode switch inside the same generator modal. Suggested: $impeccable distill

## Persona Red Flags
Alex (power user): faces either a fake 1.5s "AI" spinner or an unbounded uncancelable 28-call wait; "Semana" shows the degraded view missing the AI plan just generated; "Copiar Plan" silently does nothing useful; reviewed/dismissed ingredients are not remembered on Inspector reopen.
Sam (screen reader/keyboard-only): cannot tab to or activate any ingredient row in Inspector review or swap picker; no Escape closes any of ~15 modals, no focus management; success modal force-dismisses at 3500ms with no manual close; Inspector's decision-relevant data table uses 10-11px text, a legibility failure independent of contrast.

## Minor Observations
- replaceIngredient()'s fallback grabs the first 5 "safe" ingredients from the whole database regardless of category when no smart alternative exists
- copyFromYesterday() has a syntax bug: toast args (3000, "warning") are nested inside the toLocaleDateString() call instead of the outer showToast() call
- Class "ma-w-4xl" (line 2667) looks like a typo for "max-w-4xl" - width constraint likely not applied on desktop
- Header uses rgba(19,19,21,0.97) inline instead of the --c-bg token

## Questions to Consider
1. Why does this product have two unrelated "generate my meals" systems with almost the same name and icon - was Automatico meant to replace the weekly AI generator, or do they serve genuinely different jobs?
2. If acceptRecipeAsIs() does not persist anything, what is the actual state model for "the user has reviewed this plan" - is there one, or does every Inspector reopen start from scratch?
3. Given the AI path can silently drop a meal on failure and silently downgrade to the non-AI generator, how would a user ever discover their "AI-generated" week has a hole in it?
