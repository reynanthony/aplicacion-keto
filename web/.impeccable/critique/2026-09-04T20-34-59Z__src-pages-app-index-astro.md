---
target: app/index.astro (dashboard)
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 1
p1_count: 2
target_identity: "file:C:\\KetoLab\\web\\src\\pages\\app\\index.astro"
target_fingerprint: "sha256:e6cf3893079ab7bec6817cc239ba37dbd38bd1b99b9515db1dced980953b9231"
target_path: "C:\\KetoLab\\web\\src\\pages\\app\\index.astro"
timestamp: 2026-09-04T20-34-59Z
slug: src-pages-app-index-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector+evidence sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2/4 | No loading/skeleton state, zeros indistinguishable from real empty |
| 2 | Match System/Real World | 2/4 | Guided tour references UI elements that don't exist in shipped app |
| 3 | User Control and Freedom | 2/4 | No modal has Escape-key close; scrim-only close, not keyboard operable |
| 4 | Consistency and Standards | 1/4 | Duplicate quickAddFood() function silently breaks primary CTA; card shell retyped 7x |
| 5 | Error Prevention | 3/4 | Weight validation with clear toast, confirm modal for destructive reset |
| 6 | Recognition Rather Than Recall | 2/4 | Health-score segments are color-only, no numeric label per segment |
| 7 | Flexibility and Efficiency | 1/4 | Zero keyboard shortcuts; the one efficiency feature (quick add) is broken by the P0 bug |
| 8 | Aesthetic and Minimalist Design | 3/4 | Good density control undermined by 292 inline styles |
| 9 | Error Recovery | 2/4 | console.error only, no user-facing message on data load failure |
| 10 | Help and Documentation | 2/4 | Guide link exists but buried, no contextual help on dashboard itself |
| Total | | 20/40 | Acceptable (borderline Poor, 50%) |

## Design Specificity Verdict
Keto touches exist (cetosis day counter, macro band, keto-flavored achievement names) but structurally identical to any generic fitness/wellness bento dashboard. The one place it commits hardest to keto (macro band) is copy-pasted 3x near-identically instead of being an ownable pattern.
CLI detector: exit 2, 34 findings (overused-font x26, layout-transition x7, broken-image x1 likely false positive - hidden avatar img populated by JS). Same coverage-gap caveat as index.astro (no <html>/<head>, reduced regex engine) - 34 is real but likely under-detection for a 2452-line/292-inline-style file.
Static substitute found much deeper evidence: 292 inline styles (higher than the ~263 estimate), dozens of hardcoded hex duplicating existing tokens, AND a new finding - an undocumented parallel color system (#ea580c, #d97706, #0891b2, #dc2626, #a78bfa, #4ade80, #fb923c, #c084fc used inline with no corresponding CSS variable at all).
Visual overlays: unavailable, no browser automation tool exposed this session.

## Overall Impression
Right instinct (Health Score as single hero) but two compounding problems worse than the homepage: (1) a real functional bug, not just aesthetic - a duplicate function silently killed the fast "add food" flow, and (2) inline-style drift deep enough to spawn an undocumented parallel color system. The homepage had visual inconsistency; this file has inconsistency that already broke a feature.

## What's Working
- Health Score as singular hero (largest type, full-bleed gradient) - correct instinct for Operate dashboard
- Documented in-place bug fix with comment (min-width:0 grid fix) - real debugging discipline
- Honest empty state for achievements ("Completa tareas para desbloquear logros") instead of fake placeholders

## Priority Issues
[P0] Real bug: duplicate function silently broke the fast "add food" flow - quickAddFood() declared twice (line 1933 working search modal, line 2152 dumb 4-tile sheet); second silently overwrites first. Header's primary CTA now opens the worse flow; the search-based modal is dead code. Fix: delete the duplicate/decide deliberately which flow ships. Suggested: $impeccable harden

[P1] Non-interactive divs for action cards, invisible to keyboard/screen reader - renderDailyPlan() builds each daily-task tile as div onclick with no role/tabindex/keydown. Reinforced by detector: none of 9 modals use role=dialog/aria-modal, only 3 aria-labels total across 53 onclick handlers. Fix: render as real button/a, or add role=button tabindex=0 + Enter/Space handling. Suggested: $impeccable harden

[P1] Low-contrast text at scale, below WCAG AA - rgba(247,244,240,0.42/0.38) computes to ~3.8:1 against #131315, below 4.5:1 threshold, repeated across nearly every card. Reinforced: only .input:focus exists in global.css, no :focus-visible on any button class. Fix: one muted-text token at >=0.6 alpha, ban 0.42/0.38 for informational text. Suggested: $impeccable audit

[P2] Identical card shell retyped 7+ times plus an undocumented parallel color system - same background/border/radius/padding hand-typed inline on 7+ sections instead of using existing .kc-tile/.app-card classes; detector found overused-font x26 and invented colors with no token backing. Fix: extract .kc-section-card class, consolidate invented colors into real tokens. Suggested: $impeccable distill

[P3] Emotional-tone mismatch - static "Vas ganando la semana" subgreeting never updates regardless of real data (confirmed via grep, no script references it); weight-gain uses identical red as the destructive "reset everything" action. Fix: bind subgreeting to real plan/hs data, use a distinct neutral-trend color separate from destructive red. Suggested: $impeccable clarify

## Persona Red Flags
Alex (power user): hits the P0 bug directly (expects fast search-add, gets routed to slower flow); zero keyboard shortcuts; full-screen guided tour fires every incomplete session with no clear skip-forever option.
Sam (screen reader/keyboard-only): renderDailyPlan divs unreachable by keyboard; settings FAB has no aria-label unlike sibling buttons; no modal uses role=dialog or moves focus on open; scrim-close not keyboard operable, no Escape fallback anywhere.

## Minor Observations
- checkOnboarding() and inline redirect script both gate on the same flag independently - race risk
- Hidden aria-hidden block still receives writes every load from loadDashboard() - dead work from a prior redesign
- updateMotivationalMessage() writes to a hidden element's title attribute - dead code, never visible
- Water/exercise quick-add buttons are a cleaner pattern than the rest of the page, worth reusing as the standard
- layout-transition x7 from detector (transition: width) is a real perf anti-pattern, easy fix via transform instead

## Questions to Consider
1. If the header's primary CTA can be silently overridden by a same-named function 200 lines later and nobody noticed, has this file ever been reviewed end-to-end since it grew past ~500 lines - and how many other silent collisions hide in the remaining ~2000 lines?
2. The dashboard tells every user "you're winning the week" regardless of real data - is unearned encouragement actually better retention, or a decision nobody made on purpose?
3. If .kc-tile and .app-card already exist and are used inconsistently in this same file, is the real problem a missing design system, or one that nobody enforces?
