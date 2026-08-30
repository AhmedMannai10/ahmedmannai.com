import { ReactNode } from 'react'

/**
 * Hairline container with an optional engraved header label.
 * The body is unpadded on purpose — callers supply their own cell grid,
 * divided by hairlines rather than gaps.
 */
export default function Panel({
  label,
  indicator = false,
  children,
  className = '',
}: {
  label?: string
  indicator?: boolean
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`border border-panel-line dark:border-panel-dark-line ${className}`}>
      {label && (
        <div className="flex items-center justify-between border-b border-panel-line px-4.5 py-2.5 dark:border-panel-dark-line">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:text-text-inverse-tertiary">
            {label}
          </span>
          {indicator && (
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-signal" />
          )}
        </div>
      )}
      {children}
    </div>
  )
}
