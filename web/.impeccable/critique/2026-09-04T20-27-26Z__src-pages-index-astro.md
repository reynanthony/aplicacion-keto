---
target: index.astro (public homepage)
total_score: 21
max_score: 32
na_heuristics: 7,9
p0_count: 1
p1_count: 2
target_identity: "file:C:\\KetoLab\\web\\src\\pages\\index.astro"
target_fingerprint: "sha256:c67972ed2776071fa84047e375d07931277136c4ee6d9136e5e04de330d12565"
target_path: "C:\\KetoLab\\web\\src\\pages\\index.astro"
timestamp: 2026-09-04T20-27-26Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design-review sub-agent · B: detector+evidence sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3/4 | Static page, low ceiling by nature |
| 2 | Match System/Real World | 3/4 | "Suscribirse" CTA only anchor-scrolls, doesn't subscribe |
| 3 | User Control and Freedom | 3/4 | No traps; anchor-only CTA has no way back |
| 4 | Consistency and Standards | 1/4 | Same CTA built 3 different ways (15px/14px/100px radius, 2 inline + 1 .btn class) |
| 5 | Error Prevention | 3/4 | No forms/destructive actions |
| 6 | Recognition Rather Than Recall | 4/4 | Consistent icon+label pairing |
| 7 | Flexibility and Efficiency | n/a | Not applicable to first-visit landing |
| 8 | Aesthetic and Minimalist Design | 2/4 | 8 full sections before final CTA; raw hex/rgba instead of tokens |
| 9 | Error Recovery | n/a | No error states on static page |
| 10 | Help and Documentation | 2/4 | No FAQ/objection handling; "Inspector inteligente" unexplained |
| Total | | 21/32 | Acceptable-Good (66%) |

## Design Specificity Verdict
Specific in evidence (real hero mockup data, real content-collection numbers, real success stories), generic in voice (boilerplate SaaS-lander composition, AI-buzzword copy instead of actual keto vocabulary). CLI detector returned exit 0/0 findings but this is a coverage gap, not a clean page: .astro fragments without <html>/<head> are routed to a reduced regex engine that skips nearly all structural rules. Static substitute read found 139 inline style attributes, #ff4d00 hardcoded 7x instead of var(--c-primary), rgba(26,20,14,...) hardcoded 12x, a duplicated dark palette in the hero mockup instead of reusing [data-theme="app"] tokens, and no :focus-visible states defined for any button/link class in global.css.
Visual overlays: unavailable, no browser automation tool exposed this session.

## Overall Impression
Proves the product works (real data in the hero mockup, credible success stories) but undercuts itself at the highest-stakes moment: pricing table doesn't match the "free" promises repeated across the page, and the primary CTA is rebuilt 3 inconsistent ways in one file.

## What's Working
- Hero mockup's specificity (Health Score, net-carb math, streak) — concrete evidence, not a claim
- Success stories block — real name/age/kg-lost/duration, high-credibility social proof, genuine emotional peak
- Icon+label pairing discipline throughout

## Priority Issues
[P0] Free-tier promise doesn't match the pricing table — "Crear cuenta gratis"/"Empezar gratis" imply a free account tier that doesn't exist in the Demo/Pro pricing grid. Fix: add a real Free card or rewrite CTA copy to match what actually happens. Suggested: $impeccable clarify

[P1] Same CTA button rebuilt 3 inconsistent ways, tokens ignored — hero (15px radius, inline) and pricing (14px, inline) hand-roll the button instead of using .btn/.btn-ghost (100px, used correctly in final CTA). Reinforced by detector: 139 inline styles, #ff4d00 hardcoded 7x, duplicated dark palette in hero mockup. Fix: replace inline markup with .btn/.btn-ghost classes; migrate hero mockup colors to existing [data-theme="app"] tokens. Suggested: $impeccable distill

[P1] Nav + page exceed the choice ceiling — 6 top-level nav links + CTA = 7 simultaneous choices before content. Fix: group secondary links under a dropdown, cut to ~4 visible top-level choices. Suggested: $impeccable layout

[P2] Undefined jargon in highest-consideration content — "Inspector inteligente" (Pro tier) and "En cetosis" badge assume prior knowledge. Fix: add one-line clarifiers under each Pro feature. Suggested: $impeccable clarify

[P2] No :focus-visible state on any CTA — global.css only defines :focus for .input; every .btn/.btn-ghost/.kc-btn/.kc-chip and inline-styled link falls back to browser default. Fix: define a consistent :focus-visible treatment. Suggested: $impeccable audit

[P3] Recipe carousel gives no scroll affordance — scrollbar hidden entirely, no edge fade or card peek. Fix: add right-edge gradient mask or partial next-card peek. Suggested: $impeccable polish

## Persona Red Flags
Jordan (first-timer): unexplained "macros"; "Suscribirse" reads as payment commitment on first screen; can't reconcile free-tier copy vs pricing table; "Inspector inteligente" meaningless.
Riley (stress-tester): "Suscribirse" doesn't subscribe (just scrolls); 3 different button radii logged as inconsistency; free-tier claim vs pricing mismatch flagged as false advertising; inline styles bypass existing .card/.btn/.chip classes.
Casey (mobile/distracted): hero CTAs risk crowding/mis-tap in flex-wrap row with long labels; horizontal recipe carousel has no scroll cue, classic thumb-trap; small footer CTA in dense collapsing column zone; no reorientation aid across 8 sections if interrupted.

## Minor Observations
- 15+ hardcoded hex/rgba literals instead of --c-primary/--c-text-muted tokens
- alt text on recipe/article images is descriptive and correct
- Heading hierarchy (h1 -> h2 -> h3) clean, no skipped levels
- Pro card border:none vs Demo card visible border appears intentional given dark background
- href="/#precios" only works correctly from "/" — fragile if reused elsewhere

## Questions to Consider
1. If "Crear cuenta gratis" doesn't map to any pricing tier, has anyone traced that signup flow end-to-end since the copy was written?
2. Strip "IA/inteligente" mentions from the Pro tier — does the product still sell itself on concrete features, or is AI-buzzword copy covering for underspecified features?
3. 8 full sections ship before the final CTA — has scroll depth/drop-off ever been measured, or is "more proof = more conversion" untested?
