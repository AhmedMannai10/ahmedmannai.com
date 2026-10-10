'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={siteMetadata.theme}
      enableColorScheme={false}
      // Links and controls ease their colour; everything else snaps. Without
      // this a theme change shows the two out of step.
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
