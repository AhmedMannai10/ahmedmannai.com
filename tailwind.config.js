// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-inter)', ...fontFamily.sans], // Inter Display for headings
      },
      colors: {
        // Minimal primary color for compatibility with pliny components
        primary: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#000000', // Black for light mode
          700: '#171717',
          800: '#0A0A0A',
          900: '#000000',
        },
        // Linear-inspired neutral palette
        // Light mode backgrounds
        bg: {
          base: '#FFFFFF',
          subtle: '#FAFAFA',
          muted: '#F5F5F5',
        },
        // Dark mode backgrounds
        dark: {
          base: '#000000',
          subtle: '#0A0A0A',
          muted: '#141414',
        },
        // Text colors
        text: {
          primary: '#000000',
          secondary: '#1A1A1A',
          tertiary: '#4A4A4A',
          inverse: '#FFFFFF',
          'inverse-secondary': '#E5E5E5',
          'inverse-tertiary': '#B3B3B3',
        },
        // Border colors
        border: {
          light: '#E5E5E5',
          DEFAULT: '#D1D1D1',
          dark: '#1A1A1A',
          'dark-subtle': '#2A2A2A',
        },
        // Minimal accent (for links and interactive elements)
        accent: {
          DEFAULT: '#000000',
          hover: '#1A1A1A',
          dark: '#FFFFFF',
          'dark-hover': '#E5E5E5',
        },
        // Keep gray for compatibility and use as neutral
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.accent.DEFAULT'),
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.accent.hover'),
                textDecorationThickness: '2px',
              },
              code: {
                color: theme('colors.accent.DEFAULT'),
              },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
              color: theme('colors.text.primary'),
            },
            h3: {
              fontWeight: '600',
              color: theme('colors.text.primary'),
            },
            code: {
              color: theme('colors.text.primary'),
              backgroundColor: theme('colors.bg.subtle'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: theme('colors.bg.subtle'),
              border: `1px solid ${theme('colors.border.light')}`,
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.text.inverse'),
            a: {
              color: theme('colors.accent.dark'),
              textDecoration: 'underline',
              textDecorationThickness: '1px',
              textUnderlineOffset: '2px',
              '&:hover': {
                color: theme('colors.accent.dark-hover'),
                textDecorationThickness: '2px',
              },
              code: {
                color: theme('colors.accent.dark'),
              },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.text.inverse'),
            },
            code: {
              color: theme('colors.text.inverse'),
              backgroundColor: theme('colors.dark.muted'),
            },
            pre: {
              backgroundColor: theme('colors.dark.muted'),
              border: `1px solid ${theme('colors.border.dark')}`,
            },
          },
        },
      }),
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'dark-subtle': '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
        'dark-md':
          '0 4px 6px -1px rgba(255, 255, 255, 0.05), 0 2px 4px -2px rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
