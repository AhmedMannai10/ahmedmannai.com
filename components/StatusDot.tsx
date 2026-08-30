import type { AppStatus } from '@/data/appsData'

const LABELS: Record<AppStatus, string> = {
  live: 'LIVE',
  building: 'BUILDING',
  paused: 'PAUSED',
}

const LABEL_CLASS: Record<AppStatus, string> = {
  live: 'text-text-secondary dark:text-text-inverse-bright',
  building: 'text-signal',
  paused: 'text-text-tertiary dark:text-text-inverse-tertiary',
}

/** The 6px indicator on its own — for use inside dense rows. */
export function Dot({ status, className = '' }: { status: AppStatus; className?: string }) {
  if (status === 'building') {
    return (
      <span
        aria-hidden="true"
        className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-signal ${className}`}
        style={{ background: 'linear-gradient(90deg, #FF4D00 50%, transparent 50%)' }}
      />
    )
  }
  if (status === 'paused') {
    return (
      <span
        aria-hidden="true"
        className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full border-[1.5px] border-stone bg-transparent ${className}`}
      />
    )
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full bg-signal motion-safe:animate-blink ${className}`}
    />
  )
}

export default function StatusDot({
  status,
  label = true,
  className = '',
}: {
  status: AppStatus
  label?: boolean
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] ${LABEL_CLASS[status]} ${className}`}
    >
      <Dot status={status} />
      {label ? LABELS[status] : <span className="sr-only">{LABELS[status]}</span>}
    </span>
  )
}
