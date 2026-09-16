import Link from '@/components/Link'
import Tag from '@/components/Tag'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import { entryNumber } from '../lib/entries'

const SPEC_ROW =
  'flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] dark:border-panel-dark-line'

/**
 * One entry in the writing index — a full-bleed hairline row with the entry
 * numeral on its own rail, the way an app unit carries its serial number.
 * The readout cell folds into the copy cell's meta line below md.
 */
export default function PostRow({ post }: { post: CoreContent<Blog> }) {
  const { path, slug, date, title, summary, tags } = post
  const minutes = Math.max(1, Math.round(post.readingTime?.minutes ?? 1))

  const spec = [
    { label: 'Date', value: date.slice(0, 10) },
    { label: 'Read', value: `${minutes} min` },
  ]

  return (
    <article className="grid grid-cols-[78px_1fr] border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[140px_1fr_240px]">
      <div className="flex items-start border-r border-panel-line px-5 pt-8 dark:border-panel-dark-line md:px-10 md:pt-9">
        <span
          aria-hidden="true"
          className="font-display text-[28px] font-bold leading-none tracking-[-0.05em] text-text-tertiary dark:text-text-inverse-tertiary md:text-[44px]"
        >
          {entryNumber(slug)}
        </span>
      </div>

      <div className="min-w-0 px-5 py-8 md:px-8 md:py-9">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary md:hidden">
          <time dateTime={date}>{date.slice(0, 10)}</time>
          <span className="before:mr-2 before:content-['·']">{minutes} min read</span>
        </div>

        <h2 className="mt-2.5 font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-text-primary dark:text-text-inverse md:mt-0 md:text-[26px]">
          <Link href={`/${path}`} className="focus-ring hover:text-signal">
            {title}
          </Link>
        </h2>

        {summary && (
          <p className="mt-3.5 max-w-[62ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
            {summary}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden border-l border-panel-line dark:border-panel-dark-line md:block">
        {spec.map((row) => (
          <div key={row.label} className={SPEC_ROW}>
            <span className="text-text-tertiary dark:text-text-inverse-tertiary">{row.label}</span>
            <span className="text-text-primary dark:text-text-inverse">{row.value}</span>
          </div>
        ))}
        <Link
          href={`/${path}`}
          aria-label={`Read ${title}`}
          className="focus-ring flex items-center justify-end px-4.5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-signal hover:text-signal-hover"
        >
          Read entry →
        </Link>
      </div>
    </article>
  )
}
