# ahmedmannai.com

Next.js 14 App Router · React 18 · Tailwind v3 · Contentlayer2 · deployed on Vercel.

## Traps

**Use `npm`, not `yarn`.** `package.json` declares `packageManager: yarn@3.6.1`, but the
only lockfile in the repo is `package-lock.json` and `yarn run <script>` fails. Every
command in this project is `npm run …`.

**Design tokens live in `tailwind.config.js`, not a `globals.css`.** There is no
`globals.css` and no CSS custom properties for color — only the three `next/font`
variables. Change a color by editing the Tailwind theme.

## Design system — instrument panel

Spec: `docs/handoff/`. Direction 1C, light default.

- **One accent: `#FF4D00`** (`signal`). Status indicators, section numerals, the
  primary button, one hairline rule, hover states. Never a section background,
  never a gradient, never a glow or shadow.
- **Zero border radius.** No `rounded-*` except the status indicator dots, which the
  spec draws as circles. No `shadow-*`, no `backdrop-blur`, no `hover:scale`.
- Surfaces are defined by 1px hairline borders (`panel-line` / `panel-dark-line`).
- Sibling groups use `flex`/`grid` + `gap`, never per-item margins.
- Body text ≥ 15px, mobile hit targets ≥ 44px.
- Type: `font-display` Space Grotesk (headings, numerals), `font-mono` JetBrains Mono
  (labels, data, status, dates), `font-sans` IBM Plex Sans (paragraphs).

### Designed vs inherited routes

Designed: `/`, `/apps`, `/apps/[slug]`. These run edge-to-edge inside
`SectionContainer` (1280px chassis with hairline sides).

Inherited: `/blog`, `/videos`, `/about`, `/tags`. These are **not** redesigned — they
pick up the new tokens, header, ship-log strip and footer only, and constrain their
own column with `ReadingContainer`. Don't invent designs for them.

## Content

- `data/appsData.ts` is the single source for the apps. Hero readouts (`liveCount`,
  `buildingCount`, `lastShip`, `currentFocus`) are **derived** — never hardcode them.
  Serial numbers are permanent; nothing is renumbered when a unit is added.
- `data/shipLog.ts` feeds the signature strip; its build number is derived from the
  entry count.
- A post belongs to an app's devlog when it carries a **tag equal to the app slug**
  (`skillscan`, `tantap`, `sportzme`).
