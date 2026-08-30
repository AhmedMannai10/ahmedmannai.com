'use client'

import { useState } from 'react'
import AppUnit from './AppUnit'
import { Dot } from './StatusDot'
import type { AppUnit as AppUnitType, AppStatus } from '@/data/appsData'

type Filter = 'all' | AppStatus

const ROWS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'building', label: 'Building' },
  { key: 'paused', label: 'Paused' },
]

export default function AppsIndex({ apps }: { apps: AppUnitType[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const countFor = (key: Filter) =>
    key === 'all' ? apps.length : apps.filter((a) => a.status === key).length

  const shown = filter === 'all' ? apps : apps.filter((a) => a.status === filter)

  return (
    <>
      {/* Filter — a horizontal scroll row on mobile, a panel on desktop */}
      <div className="border-b border-panel-line dark:border-panel-dark-line">
        <div className="no-scrollbar flex items-stretch overflow-x-auto">
          <div className="flex shrink-0 items-center border-r border-panel-line px-5 font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:border-panel-dark-line dark:text-text-inverse-tertiary md:px-10">
            Filter
          </div>
          {ROWS.map((row) => {
            const count = countFor(row.key)
            const empty = count === 0
            const selected = filter === row.key
            return (
              <button
                key={row.key}
                type="button"
                onClick={() => setFilter(row.key)}
                aria-pressed={selected}
                className={`focus-ring flex min-h-[44px] shrink-0 items-center gap-2.5 whitespace-nowrap border-r border-panel-line px-5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors dark:border-panel-dark-line ${
                  selected ? 'bg-panel-sub dark:bg-panel-dark-sub' : ''
                } ${
                  empty
                    ? 'text-stone'
                    : 'text-text-secondary hover:text-signal dark:text-text-inverse-secondary'
                }`}
              >
                {row.key !== 'all' && <Dot status={row.key as AppStatus} />}
                {row.label}
                <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                  {String(count).padStart(2, '0')}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {shown.map((app) => (
        <AppUnit key={app.slug} app={app} variant="index" />
      ))}

      {/* Closing rule */}
      <div className="flex flex-col gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary md:flex-row md:items-center md:px-10">
        <span>
          Next unit · Ser. no. {String(apps.length + 1).padStart(2, '0')} · Not yet on the bench
        </span>
        <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />
        <span>
          {String(shown.length).padStart(2, '0')} / {String(apps.length).padStart(2, '0')} shown
        </span>
      </div>
    </>
  )
}
