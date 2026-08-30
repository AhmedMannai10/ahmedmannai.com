# Components

Square corners, hairline borders, no shadows. Tailwind classes below assume the tokens in `02-tokens.md`.

---

## 1. StatusDot — `components/StatusDot.tsx`

Three states. The dot is 6–7px, the label is mono 10–11px uppercase, tracking `0.16em`.

| Status     | Dot                                                                                                                | Label colour                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| `live`     | solid `#FF4D00` circle                                                                                             | `text-text-secondary` (light) / `#B9B5AD` (dark) |
| `building` | half-filled circle: `background: linear-gradient(90deg,#FF4D00 50%, transparent 50%)` + `1.5px solid #FF4D00` ring | `text-signal`                                    |
| `paused`   | 1.5px `#8B877E` ring, transparent centre                                                                           | `text-text-tertiary`                             |

```tsx
type Status = 'live' | 'building' | 'paused'
export function StatusDot({ status, label = true }: { status: Status; label?: boolean })
// renders: <span class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
```

Optional: `live` may pulse with `animation: blink 2.4s infinite` (opacity 1 → .35). No glow.

---

## 2. ShipLog — `components/ShipLog.tsx` — **the signature element**

A one-line segmented strip that appears on **every page**, directly under the header. Cells divided by vertical hairlines, mono 10px uppercase tracking `0.18em`, height ~30px. First cell is the literal label `SHIP LOG`. Last cell is right-aligned metadata (`BUILD 0412`).

```
┌──────────┬─────────────────────────┬───────────────────────┬──────────────┐
│ SHIP LOG │ ● 2026-05-14 TANTAP 2.3 │ 2026-04-02 SPORTZME…  │  BUILD 0412  │
└──────────┴─────────────────────────┴───────────────────────┴──────────────┘
```

- Border top+bottom hairline; each cell `border-r` hairline, `px-3.5 py-1.5`.
- Only the most recent entry gets the orange `●`.
- Reads from `data/shipLog.ts` (`{ date: string; text: string }[]`), newest first, sliced to 3.
- **Mobile:** collapses to a single horizontally-scrollable row (`overflow-x-auto`, no scrollbar) showing only the label cell + the newest 2 entries.
- Do **not** animate it as a marquee.

---

## 3. Panel — `components/Panel.tsx`

Generic hairline container with an optional engraved header.

```tsx
<Panel label="PANEL A · WORKSHOP STATUS" indicator>   // indicator = orange ● at right
```

- Wrapper: `border border-panel-line dark:border-panel-dark-line`.
- Header row: `border-b`, `px-4.5 py-2.5`, mono 10px uppercase tracking `0.22em`, `text-text-tertiary`.
- Body: no padding by default — callers supply their own cell grid.

### Panel cell grid (readout)

2×2 grid of stat cells, divided by hairlines (`border-r` / `border-b` on the appropriate cells, not `gap`):

```
value  = font-display text-[40px] font-bold tracking-[-0.04em]
label  = font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary
```

The "in progress" value is the only one in orange.

---

## 4. Buttons

Square, 1px, mono uppercase, tracking `0.16em`, `px-5.5 py-3.5`, font-size 12px, weight 700.

| Variant   | Idle                                                           | Hover                       |
| --------- | -------------------------------------------------------------- | --------------------------- |
| Primary   | `bg-signal text-ink`                                           | `bg-signal-hover`           |
| Secondary | `border border-text-primary text-text-primary`, transparent bg | `border-signal text-signal` |

No radius, no shadow, no scale transform.

---

## 5. Section header with numeral

```
01  APPS ─────────────────────────────────  03 UNITS
```

- numeral: `font-display text-[13px] font-bold text-signal`
- title: `font-mono text-xs uppercase tracking-[0.2em]`
- rule: `flex-1 h-px bg-panel-line`
- right meta: `font-mono text-[11px] text-text-tertiary`

Numbering is per-page and sequential: `01 APPS`, `02 …`, `03 …`, `04 WRITING & VIDEO`.

Large variant (used beside app entries): numeral at `font-display text-[52px] font-bold tracking-[-0.05em]`, orange only for the in-progress unit.

---

## 6. AppUnit — `components/AppUnit.tsx`

Two layouts, both driven by `data/appsData.ts`.

**`variant="row"`** (light 1C apps section): big numeral + name + mono meta line (`● LIVE · iOS · ANDROID · SPORTZME.COM`) + one-line description, max `42ch`. Two per row on desktop, divided by a vertical hairline; one per row on mobile.

**`variant="module"`** (rack card): header strip (`UNIT 01` / StatusDot) → screenshot window `210px` tall, `object-fit: cover` → name + one-liner → footer strip with platform. The in-progress unit's outer border is `#FF4D00`; all others are hairline.

**Featured / bench unit** (SkillScan on the homepage): full-width two-column block on `panel-sub` background — left is the numeral + name + description + **spec table**; right is two framed screenshots.

Spec table rows: `flex justify-between border-b border-panel-line py-2.5`, both sides mono 11px tracking `0.12em`. The `NEXT MILESTONE` value is orange.

---

## 7. Screenshot frame

`border border-panel-line`, `p-1.5`, background `#0E0F10` (the dark bezel reads as a device screen in both themes), image `block w-full`. No radius, no shadow.

---

## 8. Footer

Hairline top border, `px-10 py-4.5`, mono 11px uppercase tracking `0.14em`, `text-text-tertiary`. Left: `AHMED MANNAI · SER. NO. 01`. Right: GitHub · X · YouTube · LinkedIn · Instagram as flex + `gap-5.5` (not inline spacing). Hover = orange.

Real links: `github.com/ahmedmannai10`, `x.com/Ahmed_Manaii`, `youtube.com/@ahmed-mannai`.

---

## 9. Newsletter

One field + one button, square, sharing a single 1px border box.

```
┌──────────────────────────────┬──────┐
│ you@domain.com               │ JOIN │   ← JOIN cell is bg-signal, text-ink
└──────────────────────────────┴──────┘
```

`css/tailwind.css` currently forces `rounded-full` and a black pill on `input[type=email]` and `button[type=submit]` — those overrides must be rewritten (square, hairline border, transparent input background, orange submit) or the pliny `NewsletterForm` will not match.

---

## 10. Theme

Both themes ship. **Light (`panel.base #EDEAE3`) is the default**; dark is the alternate. `darkMode: 'class'` and the existing `ThemeSwitch` stay — restyle the switch to a square mono toggle.
