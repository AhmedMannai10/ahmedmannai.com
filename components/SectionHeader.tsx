/**
 * 01  APPS ───────────────────────────────  03 UNITS
 * Numbering is per-page and sequential.
 */
export default function SectionHeader({
  numeral,
  title,
  meta,
  className = '',
}: {
  numeral: string
  title: string
  meta?: string
  className?: string
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-display text-[13px] font-bold text-signal">{numeral}</span>
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-primary dark:text-text-inverse">
        {title}
      </h2>
      <span aria-hidden="true" className="h-px flex-1 bg-panel-line dark:bg-panel-dark-line" />
      {meta && (
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary">
          {meta}
        </span>
      )}
    </div>
  )
}
