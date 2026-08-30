# CLAUDE_CODE_PROMPT.md — paste this into Claude Code

You are implementing a design redesign in this repo (Next.js App Router + Tailwind + Contentlayer).

The complete spec is in `handoff/`. Read it in this order before writing any code:

1. `handoff/01-overview.md` — what changes and which files to touch
2. `handoff/02-tokens.md` — colors, fonts, type scale, geometry
3. `handoff/03-components.md` — component specs
4. `handoff/04-homepage.md` — homepage section-by-section, desktop + mobile
5. `handoff/05-apps-index.md` — the apps index route
6. `handoff/06-app-detail.md` — the app detail route

Then implement in this order, committing after each step:

1. `tailwind.config.js` tokens + `app/layout.tsx` fonts
2. `data/appsData.ts` and `data/shipLog.ts` — copy from `handoff/data/`
3. New components: `StatusDot`, `ShipLog`, `Panel`, `AppUnit`
4. `app/Main.tsx` — the homepage
5. `components/Header.tsx`, `components/Footer.tsx`, `components/MobileNav.tsx`, `components/ThemeSwitch.tsx`
6. `css/tailwind.css` — replace the rounded-full newsletter input/button overrides
7. `app/apps/page.tsx` — the apps index (route move from `app/projects`)
8. `app/apps/[slug]/page.tsx` — the app detail page

## Hard rules

- **One accent: `#FF4D00`.** Never as a background fill for a section, never in a gradient, never with a glow or blur.
- **Zero border radius** on anything you write. No `rounded-*`.
- **No shadows, no `backdrop-blur`, no `hover:scale`.** Surfaces are defined by 1px hairline borders only.
- Light theme is the default; dark theme must work too (`darkMode: 'class'` stays).
- Sibling groups (nav items, buttons, socials, chips) use `flex`/`grid` + `gap`, never inline spacing or per-item margins.
- No emoji, no stock illustrations, no consulting language ("book a call", "for founders", client case studies). Delete the `/book` CTA from the homepage.
- Never hardcode the hero readout numbers — derive them from `appsData.ts` exports (`liveCount`, `buildingCount`, `lastShip`, `currentFocus`).
- Mobile hit targets ≥ 44px. Body text ≥ 15px.
- Build only the homepage, apps index and app detail page. The Writing index, Videos and About pages are not designed yet — leave them on the existing layouts (they will inherit the new header, footer and tokens) and do not invent new designs for them.
- The six SkillScan devlog entries in the design are placeholder copy. Wire the timeline to Contentlayer posts; do not hardcode them.

## Assets you need from Ahmed

Six SkillScan screenshots go in `public/static/images/skillscan/` with these exact names:
`01-result-card.png`, `02-file-trend-chart.png`, `03-before-after.png`, `04-declare-tier.png`, `05-first-run-home.png`, `06-paywall.png`.
The homepage uses only `01` and `02`. `sportzme.png` and `tantap.png` already exist in `public/static/images/`.

## When done

Run `yarn lint` and `yarn build`, and report anything in the spec you could not implement rather than substituting your own design decision.
