# Tokens

All values are taken verbatim from the design. Do not introduce colors outside this list.

## Palette

```
Dark theme (secondary)
  base            #0E0F10
  surface         #111314
  surface-2       #16181A
  hairline        #26282A
  hairline-strong #3A3C3E
  text            #ECEAE4
  text-muted      #9C9891
  label           #6F6C67
  label-bright    #B9B5AD

Light theme (DEFAULT — direction 1C)
  base            #EDEAE3
  surface         #E5E1D8
  hairline        #C9C5BB
  hairline-soft   #DCD8CE
  text            #16181A
  text-muted      #4A4740
  label           #6B675F

Accent (single, both themes)
  signal          #FF4D00
```

Rules: orange is used for status dots, section numerals, the primary button background, one hairline rule, and hover states. Never a section background, never a gradient, never with a glow or shadow.

## `tailwind.config.js` — replace the `colors.accent` / `colors.signal` blocks

```js
colors: {
  signal: { DEFAULT: '#FF4D00', hover: '#FF6A29' },
  accent: { DEFAULT: '#FF4D00', hover: '#FF6A29', dark: '#FF4D00', 'dark-hover': '#FF7238' },

  panel: {
    base:  '#EDEAE3',
    sub:   '#E5E1D8',
    line:  '#C9C5BB',
    soft:  '#DCD8CE',
  },
  'panel-dark': {
    base:  '#0E0F10',
    sub:   '#111314',
    sub2:  '#16181A',
    line:  '#26282A',
    line2: '#3A3C3E',
  },
  text: {
    primary: '#16181B',
    secondary: '#4A4740',
    tertiary: '#6B675F',
    inverse: '#ECEAE4',
    'inverse-secondary': '#9C9891',
    'inverse-tertiary': '#6F6C67',
  },
  // keep: paper, graphite, ink, bone, stone, primary, gray (used by pliny components)
}
```

Also remove/ignore: `boxShadow` usage on new surfaces, and the `alert` color (status uses the single orange plus neutral greys).

## Type

```
Display  Space Grotesk 700 — headings, numerals, app names
Mono     JetBrains Mono 400/500/700 — labels, data, status, dates
Body     IBM Plex Sans (already loaded) — paragraphs
```

`app/layout.tsx` — add via `next/font/google`:

```ts
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
```

`tailwind.config.js` fontFamily:

```js
fontFamily: {
  sans:    ['var(--font-plex-sans)', ...fontFamily.sans],
  display: ['var(--font-space-grotesk)', ...fontFamily.sans],
  mono:    ['var(--font-jetbrains-mono)', ...fontFamily.mono],
}
```

Note: `display` currently maps to IBM Plex **Serif** — this changes it to a grotesk. Every `font-display` in the codebase will shift; that's intended.

## Type scale (as used in the design)

| Role                     | Font    | Size                                    | Weight  | Tracking          | Case      |
| ------------------------ | ------- | --------------------------------------- | ------- | ----------------- | --------- |
| Hero h1                  | display | `clamp(2.75rem, 6vw, 4.75rem)` / lh .94 | 700     | `-0.04em`         | sentence  |
| Section numeral (inline) | display | 13px                                    | 700     | —                 | —         |
| Big numeral (readout)    | display | 40–44px                                 | 700     | `-0.04em`         | —         |
| App name                 | display | 22–26px                                 | 700     | `-0.02em`         | sentence  |
| Body                     | sans    | 15–16px / lh 1.6–1.65                   | 400     | —                 | sentence  |
| Engraved label           | mono    | 10–11px                                 | 400/500 | `0.18em`–`0.22em` | UPPERCASE |
| Nav item                 | mono    | 12px                                    | 400     | `0.16em`          | UPPERCASE |
| Data value               | mono    | 15–16px                                 | 400     | —                 | —         |

## Geometry

- Border radius: **0 everywhere.** No `rounded-*` on new elements.
- Borders: `1px solid` hairline token. Panels are defined by borders, never by shadow or fill.
- Shadows: none. Delete `shadow-*` from anything you touch.
- Grid: sections are edge-to-edge with hairline dividers; inner padding `40px` desktop / `20px` mobile. Panel cells divide with 1px hairlines rather than gaps.
- Tick pattern (edge ruler): `repeating-linear-gradient(to bottom, #C9C5BB 0 1px, transparent 1px 16px)`.
