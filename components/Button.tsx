'use client'

import Link from '@/components/Link'
import { ReactNode } from 'react'

const BASE =
  'focus-ring inline-flex items-center justify-center gap-2 border px-5.5 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-colors'

const VARIANTS = {
  primary:
    'border-signal bg-signal text-panel-dark-base hover:border-signal-hover hover:bg-signal-hover',
  secondary:
    'border-text-primary bg-transparent text-text-primary hover:border-signal hover:text-signal dark:border-text-inverse dark:text-text-inverse dark:hover:border-signal dark:hover:text-signal',
} as const

export default function Button({
  href,
  variant = 'primary',
  onClick,
  children,
  className = '',
  ...rest
}: {
  href: string
  variant?: keyof typeof VARIANTS
  onClick?: () => void
  children: ReactNode
  className?: string
  [key: string]: unknown
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  )
}
