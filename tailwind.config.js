// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

// Prose runs the same three faces as the rest of the panel: grotesk headings,
// mono for engraved labels and table heads, Plex Sans for paragraphs.
const displayFont = 'var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif'
const monoFont = 'var(--font-jetbrains-mono), ui-monospace, monospace'

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['var(--font-plex-sans)', ...fontFamily.sans],
        display: ['var(--font-space-grotesk)', ...fontFamily.sans],
        mono: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
      },
      colors: {
        // ── Single accent. Status dots, one hairline rule, primary button, hover.
        // Never a section background, never a gradient, never a glow.
        signal: {
          DEFAULT: '#FF4D00',
          hover: '#FF6A29',
          dark: '#FF4D00', // same accent in both themes
        },
        accent: {
          DEFAULT: '#FF4D00',
          hover: '#FF6A29',
          dark: '#FF4D00',
          'dark-hover': '#FF7238',
        },

        // ── Instrument panel — light theme (default)
        panel: {
          base: '#EDEAE3',
          sub: '#E5E1D8',
          line: '#C9C5BB',
          soft: '#DCD8CE',
        },
        // ── Instrument panel — dark theme
        'panel-dark': {
          base: '#0E0F10',
          sub: '#111314',
          sub2: '#16181A',
          line: '#26282A',
          line2: '#3A3C3E',
        },

        text: {
          primary: '#16181B',
          secondary: '#4A4740',
          tertiary: '#6B675F',
          inverse: '#ECEAE4',
          'inverse-secondary': '#9C9891',
          'inverse-tertiary': '#6F6C67',
          'inverse-bright': '#B9B5AD',
        },

        // ── Retained: referenced by pliny components and the not-yet-redesigned
        // reading pages (blog, videos, about). Remapped onto the new palette.
        paper: '#EDEAE3',
        graphite: '#0E0F10',
        ink: '#16181B',
        bone: '#ECEAE4',
        stone: '#8B877E',
        primary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#16181B',
          700: '#16181B',
          800: '#0E0F10',
          900: '#0E0F10',
        },
        bg: {
          base: '#EDEAE3',
          subtle: '#E5E1D8',
          muted: '#DCD8CE',
        },
        dark: {
          base: '#0E0F10',
          subtle: '#111314',
          muted: '#16181A',
        },
        border: {
          light: '#DCD8CE',
          DEFAULT: '#C9C5BB',
          dark: '#26282A',
          'dark-subtle': '#3A3C3E',
        },
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.signal.DEFAULT'),
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.signal.hover'),
                textDecorationThickness: '2px',
              },
              code: {
                color: theme('colors.signal.DEFAULT'),
              },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: '-0.02em',
              color: theme('colors.text.primary'),
            },
            h3: {
              fontWeight: '700',
              color: theme('colors.text.primary'),
            },
            'h1,h2,h3,h4,h5,h6': {
              fontFamily: displayFont,
            },
            // Every section of an article opens on a hairline, the way the
            // panels elsewhere on the site are divided.
            h2: {
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTopWidth: '1px',
              borderTopColor: theme('colors.panel.line'),
            },
            // Posts that already separate their sections with `---` get one
            // rule, not two.
            'hr + h2': {
              marginTop: '2rem',
              paddingTop: '0',
              borderTopWidth: '0',
            },
            strong: {
              color: theme('colors.text.primary'),
              fontWeight: '600',
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              color: theme('colors.text.secondary'),
              borderLeftWidth: '2px',
              borderLeftColor: theme('colors.signal.DEFAULT'),
              paddingLeft: '1.25rem',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            hr: {
              borderColor: theme('colors.panel.line'),
            },
            'ul > li::marker': {
              color: theme('colors.text.tertiary'),
            },
            'ol > li::marker': {
              color: theme('colors.text.tertiary'),
            },
            thead: {
              borderBottomColor: theme('colors.panel.line'),
            },
            'thead th': {
              fontFamily: monoFont,
              fontSize: '11px',
              fontWeight: '500',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: theme('colors.text.tertiary'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.panel.soft'),
            },
            img: {
              borderRadius: '0',
            },
            figcaption: {
              fontFamily: monoFont,
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: theme('colors.text.tertiary'),
            },
            code: {
              color: theme('colors.text.primary'),
              backgroundColor: theme('colors.panel.sub'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0',
            },
            pre: {
              // Typography's stock --tw-prose-pre-code is gray-200, picked for
              // the plugin's dark pre background. This block is cream, so any
              // text Prism doesn't tokenise (bare identifiers) came out nearly
              // invisible. Set it explicitly to the body ink.
              color: theme('colors.text.primary'),
              backgroundColor: theme('colors.panel.sub'),
              border: `1px solid ${theme('colors.panel.line')}`,
              borderRadius: '0',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.text.inverse'),
            a: {
              color: theme('colors.signal.DEFAULT'),
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.signal.hover'),
                textDecorationThickness: '2px',
              },
              code: {
                color: theme('colors.signal.DEFAULT'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.text.inverse'),
              fontFamily: displayFont,
            },
            h2: {
              borderTopColor: theme('colors.panel-dark.line'),
            },
            strong: {
              color: theme('colors.text.inverse'),
            },
            blockquote: {
              color: theme('colors.text.inverse-secondary'),
              borderLeftColor: theme('colors.signal.DEFAULT'),
            },
            hr: {
              borderColor: theme('colors.panel-dark.line'),
            },
            'ul > li::marker': {
              color: theme('colors.text.inverse-tertiary'),
            },
            'ol > li::marker': {
              color: theme('colors.text.inverse-tertiary'),
            },
            thead: {
              borderBottomColor: theme('colors.panel-dark.line'),
            },
            'thead th': {
              color: theme('colors.text.inverse-tertiary'),
            },
            'tbody tr': {
              borderBottomColor: theme('colors.panel-dark.line'),
            },
            figcaption: {
              color: theme('colors.text.inverse-tertiary'),
            },
            code: {
              color: theme('colors.text.inverse'),
              backgroundColor: theme('colors.panel-dark.sub2'),
            },
            pre: {
              color: theme('colors.text.inverse'),
              backgroundColor: theme('colors.panel-dark.sub'),
              border: `1px solid ${theme('colors.panel-dark.line')}`,
            },
          },
        },
      }),
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        blink: 'blink 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
