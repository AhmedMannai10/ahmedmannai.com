import { slug } from 'github-slugger'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostRow from '@/components/PostRow'
import SectionHeader from '@/components/SectionHeader'
import NewsletterForm from '@/components/NewsletterForm'
import tagData from 'app/tag-data.json'
import { pad, totalEntries } from '../lib/entries'

const TOPICS_SHOWN = 6

interface PaginationProps {
  totalPages: number
  currentPage: number
  basePath: string
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  description?: string
  eyebrow?: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  /** Slug of the tag being viewed, when this is a `/tags/…` page. */
  activeTag?: string
}

const CELL =
  'flex min-h-[44px] shrink-0 items-center gap-2.5 whitespace-nowrap border-r border-panel-line px-5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors dark:border-panel-dark-line'

function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages
  const link =
    'focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary'
  const dead = 'inline-flex min-h-[44px] items-center text-stone'

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-3 border-b border-panel-line px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] dark:border-panel-dark-line md:flex-row md:items-center md:px-10"
    >
      {prevPage ? (
        <Link
          href={currentPage - 1 === 1 ? `/${basePath}` : `/${basePath}/page/${currentPage - 1}`}
          rel="prev"
          className={link}
        >
          ← Newer entries
        </Link>
      ) : (
        <span className={dead}>← Newest entry</span>
      )}

      <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />

      <span className="inline-flex min-h-[44px] items-center text-text-tertiary dark:text-text-inverse-tertiary">
        Page {pad(currentPage)} / {pad(totalPages)}
      </span>

      <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />

      {nextPage ? (
        <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next" className={link}>
          Older entries →
        </Link>
      ) : (
        <span className={dead}>Start of the archive →</span>
      )}
    </nav>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  description,
  eyebrow,
  initialDisplayPosts = [],
  pagination,
  activeTag,
}: ListLayoutProps) {
  const tagCounts = tagData as Record<string, number>
  const allTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])

  // The strip shows the busiest topics; the tag being viewed is always on it,
  // however rarely it is used.
  const topics = allTags.slice(0, TOPICS_SHOWN)
  if (activeTag && !topics.includes(activeTag)) topics.push(activeTag)

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      {/* ─── Intro ────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_320px]">
        <div className="px-5 py-14 md:px-10 md:py-20">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary dark:text-text-inverse-tertiary">
            <span aria-hidden="true" className="h-px w-10 bg-signal" />
            {eyebrow ?? (activeTag ? `Index · Filed under ${activeTag}` : 'Index · All writing')}
          </p>
          <h1
            className="mt-7 font-display font-bold leading-[0.96] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 3.625rem)' }}
          >
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-[52ch] text-base leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
              {description}
            </p>
          )}
        </div>
        <div className="border-t border-panel-line px-5 py-8 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-10">
          <SectionHeader
            numeral="01"
            title="Entries"
            meta={activeTag ? `${pad(posts.length)} filed` : `${pad(posts.length)} total`}
          />
        </div>
      </section>

      {/* ─── Topics strip ─────────────────────────────────────── */}
      <div className="border-b border-panel-line dark:border-panel-dark-line">
        <div className="no-scrollbar flex items-stretch overflow-x-auto">
          <div
            className={`${CELL} text-text-tertiary dark:text-text-inverse-tertiary md:px-10`}
            aria-hidden="true"
          >
            Topics
          </div>

          <Link
            href="/blog"
            className={`focus-ring ${CELL} ${
              activeTag
                ? 'text-text-secondary hover:text-signal dark:text-text-inverse-secondary'
                : 'bg-panel-sub text-text-primary dark:bg-panel-dark-sub dark:text-text-inverse'
            }`}
          >
            All
            <span className="text-text-tertiary dark:text-text-inverse-tertiary">
              {pad(totalEntries)}
            </span>
          </Link>

          {topics.map((t) => {
            const selected = activeTag === t
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                aria-current={selected ? 'page' : undefined}
                className={`focus-ring ${CELL} ${
                  selected
                    ? 'bg-panel-sub text-signal dark:bg-panel-dark-sub'
                    : 'text-text-secondary hover:text-signal dark:text-text-inverse-secondary'
                }`}
              >
                {selected && (
                  <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-signal" />
                )}
                {t}
                <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                  {pad(tagCounts[t] ?? 0)}
                </span>
              </Link>
            )
          })}

          <Link
            href="/tags"
            className={`focus-ring ${CELL} border-r-0 text-signal hover:text-signal-hover`}
          >
            All {allTags.length} topics →
          </Link>
        </div>
      </div>

      {/* ─── Entries ──────────────────────────────────────────── */}
      {displayPosts.length === 0 ? (
        <p className="border-b border-panel-line px-5 py-12 font-mono text-[11px] uppercase tracking-[0.16em] text-stone dark:border-panel-dark-line md:px-10">
          No entries under this topic yet
        </p>
      ) : (
        displayPosts.map((post) => <PostRow key={post.path} post={post} />)
      )}

      {pagination && pagination.totalPages > 1 && <Pagination {...pagination} />}

      {/* ─── 02 Ship log ──────────────────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_400px]">
        <div className="px-5 py-10 md:px-10 md:py-12">
          <SectionHeader numeral="02" title="Ship log" meta="Email" />
          <p className="mt-6 max-w-[48ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
            One email when I ship something — what shipped, what broke, and what is on the bench
            next. No sequence, no drip, unsubscribe in one click.
          </p>
        </div>
        <div className="border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-12">
          <NewsletterForm label="Get the ship log" section="writing_index" />
        </div>
      </section>
    </>
  )
}
