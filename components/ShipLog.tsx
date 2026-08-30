import shipLog, { buildNumber } from '@/data/shipLog'
import { Dot } from './StatusDot'

const CELL =
  'flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-panel-line px-3.5 py-1.5 dark:border-panel-dark-line'

/**
 * The signature element — a one-line segmented strip directly under the header
 * on every page. Not a marquee. On mobile it scrolls horizontally and shows the
 * label cell plus the two newest entries.
 */
export default function ShipLog() {
  const entries = [...shipLog].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3)

  return (
    <div className="border-y border-panel-line dark:border-panel-dark-line">
      <div className="no-scrollbar flex items-stretch overflow-x-auto font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary">
        <div className={`${CELL} text-text-secondary dark:text-text-inverse-bright`}>Ship log</div>

        {entries.map((entry, i) => (
          <div
            key={entry.date + entry.text}
            className={`${CELL} ${i === 2 ? 'hidden md:flex' : ''}`}
          >
            {i === 0 && <Dot status="live" />}
            <time dateTime={entry.date}>{entry.date}</time>
            <span className="text-text-secondary dark:text-text-inverse-bright">{entry.text}</span>
          </div>
        ))}

        <div className="hidden flex-1 md:block" />
        <div className={`${CELL} border-r-0 md:border-l`}>Build {buildNumber}</div>
      </div>
    </div>
  )
}
