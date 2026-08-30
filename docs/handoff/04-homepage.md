# Homepage — `app/Main.tsx`

Rewrite as the light instrument panel (direction 1C). Section order, top to bottom:

```
HEADER            square bar · logo dot + MANNAI + SER.01 · nav cells divided by hairlines · right cell "◐ SHIPPING SKILLSCAN"
SHIP LOG STRIP    signature element (components/ShipLog.tsx)
HERO              2 cols: [copy] | [PANEL A · WORKSHOP STATUS, 380px]
APPS 01/02        2 cols, AppUnit variant="row" — SportzMe, TanTap
BENCH UNIT 03     full-width featured block on panel-sub — SkillScan spec table + 2 screenshots
04 WRITING&VIDEO  2 cols: [list of 4 items] | [newsletter]
FOOTER
```

Every section is separated by a full-bleed 1px hairline (`border-b border-panel-line`), no vertical gaps between sections.

## Hero — left column

```
eyebrow   ── 40px orange rule ── "INDEPENDENT SOFTWARE · EST. 2021"   (mono 10px, tracking .24em)
h1        "Three apps, built to be used."      (display 700, clamp(2.75rem,6vw,4.75rem), lh .94, tracking -.04em, max-w-[12ch])
body      "Small software instruments, made with care. Two are in the field. One is on the bench, and you can watch it come together."  (max-w-[44ch], lh 1.65)
buttons   [SEE THE APPS] primary   [FOLLOW THE BUILD] secondary
```

Approved hero alternatives if he wants to swap: "I build apps and ship them." · "Software engineer. I make the apps I want to exist."

Copy rule: no first-person flexing about being solo, no "book a call", no "for founders", no client case studies.

## Hero — right column (PANEL A · WORKSHOP STATUS)

1. Header row: `PANEL A · WORKSHOP STATUS` + orange `●`.
2. **Ships per quarter** bar chart: 6 bars, `w-4`, heights `28% 46% 38% 70% 55% 100%`, all `panel-line` except the last which is `signal`; under it a tick rule `repeating-linear-gradient(to right,#C9C5BB 0 1px,transparent 1px 11px)`. Reuse `components/Sparkline.tsx` only if you make it render square bars with no curve/fill — otherwise write it inline.
3. 2×2 hairline cell grid:

|                        |                              |
| ---------------------- | ---------------------------- |
| `02` IN THE FIELD      | `01` ON THE BENCH _(orange)_ |
| `2026-05-14` LAST SHIP | `SKILLSCAN` FOCUS            |

Derive `02` / `01` / last ship / focus from `data/appsData.ts` — do not hardcode.

## Bench unit (SkillScan)

Left column: numeral `03` in orange, name, `◐ BUILDING · MOBILE · NO PUBLIC LINK`, description, then the spec table:

|                |                                 |
| -------------- | ------------------------------- |
| MEASURES       | HOLD TIME · CLEAN TIME          |
| STANDARD       | FIG ART. 9.3                    |
| TIERS          | TUCK · ADV · STRADDLE · FULL    |
| NEXT MILESTONE | TESTFLIGHT · 2026-07 _(orange)_ |

Right column: two screenshots in the frame from `03-components.md` §7, side by side, `flex gap-4 items-center`. Screens to use: the SkillScan result card and the trend chart. Ahmed has 6 SkillScan captures — the other four (before/after, declare-tier, first-run home, paywall) belong on the app detail page, not here.

## 04 Writing & video

Left: 4 items, each `[VID|TXT] title ───── 2026-06` — kind label mono 10px (`min-w-6`), title 15px, a `flex-1 h-px bg-panel-soft` leader rule, date mono 11px. Then `ALL 11 POSTS →` in orange mono 11px tracking `.16em`.

Real items, newest first:

```
VID  I built an app to fix pickup football
VID  Devlog #1: I built an app that rates your calisthenics skills
TXT  The plan for $1k MRR, written down
TXT  Terraform on Azure: a working reference
```

Source from Contentlayer posts + `data/videosData.ts`, merged and sorted by date, `VID`/`TXT` from the source type. Don't hardcode.

Right: newsletter (§9).

## Responsive

Single breakpoint at `md` (768px). Below it:

- Every 2-column grid → 1 column; the vertical hairlines become horizontal `border-t`.
- Hero panel moves **below** the hero copy, full width; its 2×2 cell grid stays 2×2.
- Nav → existing `MobileNav`, restyled: full-screen `panel-base` sheet, mono uppercase items at 18px, one per row divided by hairlines, no radius. Hit targets ≥ 44px.
- Ship-log strip → horizontal scroll, label cell + newest 2 entries.
- Apps: `variant="row"` stacks; the bench unit's screenshots go side by side under the spec table at 50/50.
- Section padding 40px → 20px. Hero h1 bottoms out at 2.75rem.

## Delete from the current homepage

`AmbientGlow`, the `STATS` array (client-outcome numbers), `CAPACITY_TREND`, the `/book` "Book a Call" CTA, all `rounded-full` / `shadow-lg` / `backdrop-blur` / `hover:scale-[1.02]`, and the "0→1 product builds for founders" subhead. Keep the PostHog `cta_clicked` capture pattern on the two new buttons (`hero_see_apps`, `hero_follow_build`).
