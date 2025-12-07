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
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
      },
      colors: {
        // Primary color - Orange (for buttons, links, accents)
        primary: {
          50: '#fff4ed',
          100: '#ffe4d4',
          200: '#ffc9a8',
          300: '#ffa471',
          400: '#ff7f50',
          500: '#ff6b35',
          600: '#ff5722',
          700: '#e64a19',
          800: '#c43e15',
          900: '#a03312',
          950: '#5a1a09',
        },
        // Dark Green (main background)
        darkGreen: {
          50: '#f0f7f4',
          100: '#d9ede6',
          200: '#b7dbd0',
          300: '#88c1b0',
          400: '#5aa08a',
          500: '#3d8570',
          600: '#2d6b5a',
          700: '#25564a',
          800: '#21463d',
          900: '#1d3a33',
          950: '#0f211c',
        },
        // Cream/Beige (light backgrounds and text)
        cream: {
          50: '#fefdfb',
          100: '#faf8f3',
          200: '#f5f1e8',
          300: '#ede5d4',
          400: '#e2d5bc',
          500: '#d4c2a0',
          600: '#c4ab82',
          700: '#b3946a',
          800: '#947c5a',
          900: '#7a684d',
          950: '#413528',
        },
        // Brown/Tan (panels and accents)
        brown: {
          50: '#faf8f5',
          100: '#f3efe8',
          200: '#e6ddd0',
          300: '#d4c4b0',
          400: '#bda68b',
          500: '#a0826d',
          600: '#8b6f5a',
          700: '#735a4a',
          800: '#5f4b3f',
          900: '#4f4037',
          950: '#2a211c',
        },
        // Yellow (decorative elements, stars)
        accentYellow: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        // Keep gray for compatibility
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.primary.600'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.cream.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
