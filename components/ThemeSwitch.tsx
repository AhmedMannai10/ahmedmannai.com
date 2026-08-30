'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * Square mono toggle — two states. The popover menu the previous version used
 * could not be square and shadowless, so the System option is gone; the
 * default theme is light and the toggle flips it.
 */
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Switch theme'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="focus-ring flex h-11 min-w-[64px] items-center justify-center px-3.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary transition-colors hover:text-signal dark:text-text-inverse-tertiary"
    >
      {mounted ? isDark ? 'Dark' : 'Light' : <span className="opacity-0">Light</span>}
    </button>
  )
}

export default ThemeSwitch
