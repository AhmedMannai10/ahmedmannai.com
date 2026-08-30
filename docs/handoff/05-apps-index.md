# Apps index — `app/apps/page.tsx`

New route. Replaces the current `/projects` page for apps (keep `/projects` as a redirect to `/apps`, or rename the route and update `data/headerNavLinks.ts`).

Design source: `Site Pages.dc.html` → option **2b**.

## Structure

```
HEADER            same as homepage
SHIP LOG STRIP    signature element
INTRO             2 cols: [eyebrow + h1 "The apps" + paragraph] | [FILTER panel, 320px]
UNIT ROW × 3      3 cols: [screen 220px] | [numeral + name + tagline + copy] | [spec column 260px]
FOOTER RULE       "NEXT UNIT · SER. NO. 04 · NOT YET ON THE BENCH" ──tick rule── "03 / 03 SHOWN"
FOOTER
```

## Intro

- eyebrow: 40px orange rule + `INDEX · ALL UNITS`
- h1 `The apps` — display 700, 58px, lh .96, tracking -.04em
- paragraph, max `52ch`: "Everything on the workbench, in the field or in between. Each unit keeps its serial number for good — nothing gets renumbered when something new arrives."

## Filter panel

Header cell `FILTER`, then four rows divided by hairlines: `ALL 03` (selected — `bg-panel-sub`), `● LIVE 02`, `◐ BUILDING 01`, `○ PAUSED 00` (whole row at `#9C9891` when the count is zero). Counts derived from `appsData`, never hardcoded. Client-side filter, no route change; selected row is the only one with the `panel-sub` background.

## Unit row (`AppUnit variant="index"`)

Grid `220px 1fr 260px`, divided by vertical hairlines, each row closed with `border-b`.

1. **Screen cell** — `bg-panel-sub`, `p-6`, centred. Live units: a 170px hairline box with the app name in mono 10px `#A9A49A` until real screenshots exist. In-progress unit: the real screenshot in the dark-bezel frame (§7 of components), and the cell drops the `panel-sub` background because the whole row already has it.
2. **Copy cell** — numeral `display 44px/700/-.05em` (orange only when `status === 'building'`), name `display 28px/700`, tagline in mono 11px tracking `.12em` `text-tertiary`, then the description at 15px `max-w-[52ch]`.
   In-progress units add a build meter under the copy: `flex-1 h-1 bg-panel-soft` with an orange fill at `buildProgress`, plus `BUILD 64% · TESTFLIGHT 2026-07` in mono 10px.
3. **Spec cell** — four rows divided by hairlines, `px-4.5 py-3.5`, mono 10px tracking `.14em`, label left in `text-tertiary` / value right in ink:

| STATUS | `● LIVE` / `◐ BUILDING` (orange) |
| PLATFORM | `iOS · ANDROID` |
| LAST SHIP | date, or `—` in `#A9A49A` when there is none |
| _(link row)_ | `SPORTZME.COM →` / `FOLLOW THE BUILD →` — orange, no bottom border |

The in-progress row gets `bg-panel-sub` across all three cells.

## Mobile

One column. Order per unit: numeral+name+tagline → screen → copy → spec rows. The vertical hairlines become `border-t`. Filter panel becomes a horizontal scroll row of four cells above the first unit. Padding 40px → 20px.

## Data additions

`data/appsData.ts` needs two more optional fields for this page:

```ts
buildProgress?: number   // 0–100, in-progress units only  → 64 for SkillScan
tagline: string          // already present — used as the mono line under the name
```
