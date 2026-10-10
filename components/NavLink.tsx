'use client'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Link from './Link'

// The topic pages are part of the writing section, so Writing stays lit there.
const ALSO_UNDER: Record<string, string[]> = {
  '/blog': ['/tags'],
}

/**
 * A nav link that knows whether you are inside its section. The current one
 * carries `aria-current` and takes `activeClassName` in place of
 * `idleClassName` — the same filled cell the filter and topics strips use for
 * their selected item.
 */
export default function NavLink({
  href,
  className = '',
  activeClassName = '',
  idleClassName = '',
  onClick,
  children,
}: {
  href: string
  className?: string
  activeClassName?: string
  idleClassName?: string
  onClick?: () => void
  children: ReactNode
}) {
  const pathname = usePathname() || ''
  const active = [href, ...(ALSO_UNDER[href] || [])].some(
    (root) => pathname === root || pathname.startsWith(`${root}/`)
  )

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`${className} ${active ? activeClassName : idleClassName}`}
    >
      {children}
    </Link>
  )
}
