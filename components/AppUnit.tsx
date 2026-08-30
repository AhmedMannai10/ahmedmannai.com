import Link from '@/components/Link'
import StatusDot, { Dot } from './StatusDot'
import ScreenFrame from './ScreenFrame'
import type { AppUnit as AppUnitType } from '@/data/appsData'

function MetaLine({ app }: { app: AppUnitType }) {
  const parts = [...app.platforms.map((p) => p.toUpperCase())]
  if (app.linkLabel) parts.push(app.linkLabel.toUpperCase())
  else if (app.status === 'building') parts.push('NO PUBLIC LINK')

  return (
    <span className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary">
      <StatusDot status={app.status} />
      {parts.map((p) => (
        <span key={p} className="before:mr-2 before:content-['·']">
          {p}
        </span>
      ))}
    </span>
  )
}

/** Big-numeral row — the homepage apps section. */
function RowVariant({ app }: { app: AppUnitType }) {
  const numeralClass =
    app.status === 'building' ? 'text-signal' : 'text-text-tertiary dark:text-text-inverse-tertiary'

  return (
    <div className="flex gap-5 px-5 py-9 md:px-10">
      <span
        aria-hidden="true"
        className={`font-display text-[52px] font-bold leading-none tracking-[-0.05em] ${numeralClass}`}
      >
        {app.serial}
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-text-primary dark:text-text-inverse md:text-[26px]">
          <Link href={`/apps/${app.slug}`} className="focus-ring hover:text-signal">
            {app.name}
          </Link>
        </h3>
        <div className="mt-2.5">
          <MetaLine app={app} />
        </div>
        <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
          {app.description}
        </p>
      </div>
    </div>
  )
}

/** Three-cell index row — /apps. */
function IndexVariant({ app }: { app: AppUnitType }) {
  const numeralClass =
    app.status === 'building' ? 'text-signal' : 'text-text-primary dark:text-text-inverse'
  const shot = app.screenshots?.[0]

  const specRows: { label: string; value: string; signal?: boolean }[] = [
    { label: 'Status', value: app.status.toUpperCase(), signal: app.status === 'building' },
    { label: 'Platform', value: app.platforms.map((p) => p.toUpperCase()).join(' · ') },
    { label: 'Last ship', value: app.lastShip || '—' },
  ]

  return (
    <div
      className={`grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[220px_1fr_260px] ${
        app.status === 'building' ? 'bg-panel-sub dark:bg-panel-dark-sub' : ''
      }`}
    >
      {/* Copy cell — first on mobile so the name leads */}
      <div className="order-2 px-5 py-8 md:order-none md:col-start-2 md:border-x md:border-panel-line md:px-8 md:dark:border-panel-dark-line">
        <span
          aria-hidden="true"
          className={`font-display text-[44px] font-bold leading-none tracking-[-0.05em] ${numeralClass}`}
        >
          {app.serial}
        </span>
        <h2 className="mt-3 font-display text-[28px] font-bold tracking-[-0.02em] text-text-primary dark:text-text-inverse">
          <Link href={`/apps/${app.slug}`} className="focus-ring hover:text-signal">
            {app.name}
          </Link>
        </h2>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-tertiary dark:text-text-inverse-tertiary">
          {app.tagline}
        </p>
        <p className="mt-4 max-w-[52ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
          {app.description}
        </p>

        {app.status === 'building' && typeof app.buildProgress === 'number' && (
          <div className="mt-6 max-w-[52ch]">
            <div className="h-1 w-full bg-panel-soft dark:bg-panel-dark-line">
              <div className="h-full bg-signal" style={{ width: `${app.buildProgress}%` }} />
            </div>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary">
              Build {app.buildProgress}%
              {app.nextMilestone ? ` · ${app.nextMilestone.toUpperCase()}` : ''}
            </p>
          </div>
        )}
      </div>

      {/* Screen cell */}
      <div
        className={`order-1 flex items-center justify-center px-5 py-8 md:order-none md:col-start-1 md:row-start-1 ${
          app.status === 'building' ? '' : 'bg-panel-sub dark:bg-panel-dark-sub'
        }`}
      >
        {app.status === 'building' && shot ? (
          <ScreenFrame src={shot.src} alt={`${app.name} screenshot`} className="w-[150px]" />
        ) : (
          <div className="flex h-[170px] w-[150px] items-center justify-center border border-panel-line dark:border-panel-dark-line">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone">
              {app.name}
            </span>
          </div>
        )}
      </div>

      {/* Spec cell */}
      <div className="order-3 border-t border-panel-line dark:border-panel-dark-line md:order-none md:col-start-3 md:row-start-1 md:border-t-0">
        {specRows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] dark:border-panel-dark-line"
          >
            <span className="text-text-tertiary dark:text-text-inverse-tertiary">{row.label}</span>
            <span
              className={
                row.signal
                  ? 'flex items-center gap-2 text-signal'
                  : row.value === '—'
                    ? 'text-stone'
                    : 'text-text-primary dark:text-text-inverse'
              }
            >
              {row.label === 'Status' && <Dot status={app.status} />}
              {row.value}
            </span>
          </div>
        ))}
        <Link
          href={app.href || `/apps/${app.slug}`}
          className="focus-ring flex items-center justify-end px-4.5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal hover:text-signal-hover"
        >
          {app.href ? `${app.linkLabel} →` : 'Follow the build →'}
        </Link>
      </div>
    </div>
  )
}

export default function AppUnit({
  app,
  variant = 'row',
}: {
  app: AppUnitType
  variant?: 'row' | 'index'
}) {
  return variant === 'index' ? <IndexVariant app={app} /> : <RowVariant app={app} />
}
