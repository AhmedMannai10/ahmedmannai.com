# App detail — `app/apps/[slug]/page.tsx`

New dynamic route, one page per unit in `data/appsData.ts`. Design source: `Site Pages.dc.html` → option **2c** (SkillScan, the in-progress case — build it so a `live` unit degrades gracefully: no build meter, no milestone "NOW" row, `LAST SHIP` populated, a real product link instead of "FOLLOW THE BUILD").

## Structure

```
HEADER            breadcrumb variant: "Apps / SER. NO. 03 · SkillScan"; right cell = status
SHIP LOG STRIP    signature element
TITLE + SPEC      2 cols: [84px numeral + h1 + description + 2 buttons] | [SPECIFICATION panel, 420px]
01 READOUTS       full-width on panel-sub — 3-col screenshot grid with captions
02 DEVLOG         2 cols: [timeline] | [MILESTONES panel + beta-invite field]
PREV / NEXT       "← SER. NO. 02 · TANTAP" ──tick rule── "SER. NO. 04 · TBD" (dimmed if absent)
FOOTER
```

## Title block

- Numeral `display 84px/700/-.05em`, `line-height .85`, orange when in progress.
- `h1` display 700, 56px, lh .95, tracking -.04em.
- Under it, mono 12px tracking `.14em` `text-tertiary`: the app's one-line role — `A MEASUREMENT INSTRUMENT FOR STATIC HOLDS`.
- Two paragraphs, `max-w-[56ch]`, 16px / lh 1.7. Second paragraph states the availability honestly: "No public link yet. It's on the bench, and the build is happening in the open."
- Buttons: primary `FOLLOW THE BUILD`, secondary `READ THE DEVLOG`. For live units: primary `OPEN <LINKLABEL> →`, secondary `READ THE DEVLOG`.

## SPECIFICATION panel (420px)

Header `SPECIFICATION` + orange `●`. Nine rows, hairline-divided, `px-4.5 py-3.5`, mono 11px tracking `.1em`, label `text-tertiary` left / value ink right:

```
SER. NO.         03
STATUS           ◐ BUILDING          (orange)
PLATFORM         iOS · ANDROID
MEASURES         HOLD TIME · CLEAN TIME
STANDARD         FIG ART. 9.3
TIERS            TUCK · ADV · STRADDLE · FULL
INPUT            60 FPS VIDEO · ON DEVICE
STARTED          2025-11
NEXT MILESTONE   TESTFLIGHT · 2026-07  (orange)
```

Rows come from an optional `spec?: { label: string; value: string; signal?: boolean }[]` on the app record — the page renders whatever is there, so a different app can have different rows.

Below the rows, separated by a hairline: `BUILD PROGRESS` / `64%` in mono 10px, a `h-1.5 bg-panel-soft` bar with an orange fill, then a tick rule. Omit this whole block when `status !== 'building'`.

## 01 Readouts

Full-width `bg-panel-sub`, padding 36/40. Section header `01 READOUTS ──── 06 SCREENS` (count from the array). 3-column grid, `gap-5`, each item = dark-bezel frame (§7) + caption in mono 10px tracking `.14em` `text-tertiary`.

Captions are authored, not derived from filenames. SkillScan, in order:

```
01 · RESULT CARD      02 · TREND OVER TIME   03 · BEFORE / AFTER
04 · DECLARE TIER     05 · FIRST RUN         06 · UPGRADE
```

Extend `appsData` to `screenshots?: { src: string; caption: string }[]`.

## 02 Devlog

Left column, entries from Contentlayer (posts tagged with the app slug) — grid `96px 20px 1fr` per entry, `border-t` between:

- date, mono 11px tracking `.1em`, `text-tertiary`
- a 7px orange dot, centred in its column, `pt-5.5` so it aligns to the title's optical centre
- title `display 17px/700`, body 14px / lh 1.6 / `max-w-[56ch]` `text-secondary`

Closed by `FULL DEVLOG →` in orange mono 11px on its own `border-t` row. Show 4 entries; the design's tweak allowed 3–6, so make the count a constant at the top of the file.

**The six devlog entries in the design are placeholder copy I wrote — replace with Ahmed's real posts.** Do not ship them as-is.

## MILESTONES panel (360px)

Header `MILESTONES`, then one row per milestone: dot + name + state, mono 11px tracking `.1em`.

| dot                        | state                                                           |
| -------------------------- | --------------------------------------------------------------- |
| solid orange               | `DONE` — name in ink, state in `text-tertiary`                  |
| half orange (building dot) | `NOW` — state in orange                                         |
| grey ring                  | future — whole row `#8B877E`, state is the target date or `TBD` |

New field: `milestones?: { name: string; state: 'done' | 'now' | 'todo'; when?: string }[]`.

Under it, hairline-separated: `GET THE BETA INVITE` label + the square newsletter field (`JOIN`). For live units this becomes `GET THE SHIP LOG`.

## Mobile

One column throughout. Numeral drops to 56px and sits above the h1 rather than beside it. Spec panel full width. Readouts grid → 2 columns. Devlog: date and dot move to a single row above the title (dot then date, `gap-3`), body full width. Milestones and beta field stack under the devlog.

## Also

- `app/projects/*` becomes `app/apps/*`; update `data/headerNavLinks.ts` and any internal links.
- Generate `generateStaticParams` from `appsData` slugs, and per-page metadata via the existing `app/seo.tsx` helper.
