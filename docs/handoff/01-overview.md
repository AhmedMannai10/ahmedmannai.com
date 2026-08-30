# Handoff — ahmedmannai.com redesign (industrial / instrument panel)

Target repo: `AhmedMannai10/ahmedmannai.com` (Next.js App Router + Tailwind + Contentlayer).
Design source: `Homepage Explorations.dc.html` in the design project — **direction 1C (light full-instrument panel)**, with the writing & video row from 1B appended.

## What changes conceptually

The current homepage is a consultant landing page: green accent, rounded-full pills, ambient glow, "Book a Call", "0→1 product builds for founders", capacity-gain stats. The redesign is a **builder's showcase**: the apps are the hero, "in progress" is a designed state, and all consulting language is removed.

Concretely:

- Accent green `#0E6B57` / `#14B896` → **one accent, signal orange `#FF4D00`**, used only for status dots, one hairline rule, the primary button and hover states. Never a background fill or a large area.
- Rounded-full buttons, `rounded-2xl` cards, `shadow-lg`, `backdrop-blur` → **square corners, 1px hairline borders, no shadows, no blur.**
- `AmbientGlow` → deleted from the homepage.
- Hero stats about client outcomes → **workshop status readout**: apps live, in progress, last ship date, current focus.
- New signature element repeated on every page: the **ship log strip** (see `03-components.md`).

## Files to touch

| File                         | Action                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `tailwind.config.js`         | Replace accent + add instrument tokens — see `02-tokens.md`                                                               |
| `app/layout.tsx`             | Swap fonts to Space Grotesk (display) + JetBrains Mono (mono); keep Plex Sans for body                                    |
| `app/Main.tsx`               | Rewrite homepage per `04-homepage.md`                                                                                     |
| `components/Header.tsx`      | Add ship-log strip under the nav bar; square nav, mono uppercase labels                                                   |
| `components/Footer.tsx`      | Mono uppercase, hairline top border, `SER. NO. 01` line                                                                   |
| `components/AmbientGlow.tsx` | Remove usage (file can stay unused or be deleted)                                                                         |
| `components/StatusDot.tsx`   | **New** — LIVE / BUILDING / PAUSED indicator                                                                              |
| `components/ShipLog.tsx`     | **New** — the signature strip                                                                                             |
| `components/Panel.tsx`       | **New** — hairline panel with optional mono header label                                                                  |
| `components/AppUnit.tsx`     | **New** — app card / rack module                                                                                          |
| `data/appsData.ts`           | **New** — replaces `projectsData.ts` for the apps section (adds status, platform, serial, lastShip)                       |
| `css/tailwind.css`           | Newsletter input/button overrides currently force `rounded-full` + black pill — change to square hairline + orange submit |

## Order of implementation

1. `02-tokens.md` — tokens and fonts first, so everything downstream inherits them.
2. `03-components.md` — StatusDot, ShipLog, Panel, AppUnit, section header, buttons.
3. `data/appsData.ts` + `data/shipLog.ts` — real content.
4. `04-homepage.md` — assemble `app/Main.tsx` desktop + mobile.
5. Header / Footer / MobileNav / ThemeSwitch.
6. `05-apps-index.md` — `app/apps/page.tsx`.
7. `06-app-detail.md` — `app/apps/[slug]/page.tsx`.

## Route changes

`app/projects/*` → `app/apps/*`. Update `data/headerNavLinks.ts` (Apps · Writing · Videos · About) and internal links; keep `/projects` as a redirect.

## Designed and specced

| Screen             | Spec                         | Design source                        |
| ------------------ | ---------------------------- | ------------------------------------ |
| Homepage (desktop) | `04-homepage.md`             | `Homepage Explorations.dc.html` → 1C |
| Homepage (mobile)  | `04-homepage.md` §Responsive | `Site Pages.dc.html` → 2A            |
| Apps index         | `05-apps-index.md`           | `Site Pages.dc.html` → 2B            |
| App detail         | `06-app-detail.md`           | `Site Pages.dc.html` → 2C            |
| Component sheet    | `03-components.md`           | `Site Pages.dc.html` → 2D            |

Not designed yet: Writing index, Videos, About. Don't invent them — reuse the header, ship-log strip, section header and footer, and ask before designing the rest.

## Content still needed from Ahmed

- SportzMe and TanTap screenshots (the index and homepage use hairline placeholder boxes until then).
- Real devlog entries for SkillScan — the six in the design are placeholder copy.
