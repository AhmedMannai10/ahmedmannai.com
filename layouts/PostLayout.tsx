import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Panel from '@/components/Panel'
import Tag from '@/components/Tag'
import SectionHeader from '@/components/SectionHeader'
import NewsletterForm from '@/components/NewsletterForm'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import siteMetadata from '@/data/siteMetadata'
import { entryNumber, pad, totalEntries } from '../lib/entries'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

type TocItem = { value: string; url: string; depth: number }

interface PostRef {
  path: string
  slug: string
  title: string
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: PostRef
  prev?: PostRef
  children: ReactNode
}

const SPEC_ROW =
  'flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] last:border-b-0 dark:border-panel-dark-line'

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, lastmod, title, summary, tags } = content
  const serial = entryNumber(slug)

  const minutes = Math.max(1, Math.round(content.readingTime?.minutes ?? 1))
  const words: number = content.readingTime?.words ?? 0
  const wordCount = words >= 1000 ? `${(words / 1000).toFixed(1)}K` : String(words)
  const author = authorDetails[0]

  const updated = lastmod && lastmod.slice(0, 10) !== date.slice(0, 10) ? lastmod : null

  const toc = ((content.toc as unknown as TocItem[]) || []).filter((h) => h.depth === 2)

  const spec: { label: string; value: string; signal?: boolean }[] = [
    { label: 'Entry', value: `${serial} / ${pad(totalEntries)}` },
    { label: 'Published', value: date.slice(0, 10) },
    ...(updated ? [{ label: 'Updated', value: updated.slice(0, 10), signal: true }] : []),
    { label: 'Read time', value: `${minutes} min` },
    { label: 'Words', value: wordCount },
    ...(author?.name ? [{ label: 'Author', value: author.name }] : []),
  ]

  return (
    <>
      <ScrollTopAndComment />

      {/* ─── Breadcrumb ───────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:border-panel-dark-line dark:text-text-inverse-tertiary md:px-10">
        <span className="flex min-w-0 items-center gap-2">
          <Link href="/blog" className="focus-ring shrink-0 hover:text-signal">
            Writing
          </Link>
          <span aria-hidden="true">/</span>
          <span className="truncate text-text-primary dark:text-text-inverse">
            Entry {serial} · {title}
          </span>
        </span>
        <span className="hidden shrink-0 items-center gap-2 md:flex">
          <time dateTime={date}>{date.slice(0, 10)}</time>
          <span className="before:mr-2 before:content-['·']">{minutes} min</span>
        </span>
      </div>

      <article>
        {/* ─── Title + specification ──────────────────────────── */}
        <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_400px]">
          <div className="px-5 py-12 md:px-10 md:py-16">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-7">
              <span
                aria-hidden="true"
                className="font-display text-[48px] font-bold leading-[0.85] tracking-[-0.05em] text-text-tertiary dark:text-text-inverse-tertiary md:text-[84px]"
              >
                {serial}
              </span>
              <div className="min-w-0">
                <h1
                  className="font-display font-bold leading-[0.98] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
                  style={{ fontSize: 'clamp(2.125rem, 4.5vw, 3.25rem)' }}
                >
                  {title}
                </h1>
              </div>
            </div>

            {summary && (
              <p className="mt-8 max-w-[56ch] text-base leading-[1.7] text-text-secondary dark:text-text-inverse-secondary">
                {summary}
              </p>
            )}

            {tags && tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8">
            <Panel label="Specification" indicator>
              {spec.map((row) => (
                <div key={row.label} className={SPEC_ROW}>
                  <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                    {row.label}
                  </span>
                  <span
                    className={
                      row.signal ? 'text-signal' : 'text-text-primary dark:text-text-inverse'
                    }
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </Panel>
          </div>
        </section>

        {/* ─── Body ───────────────────────────────────────────── */}
        <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_320px]">
          <div className="min-w-0 px-5 py-12 md:px-10 md:py-14">
            <div className="prose max-w-[72ch] dark:prose-invert">{children}</div>
          </div>

          <div className="flex flex-col gap-8 border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-14">
            {toc.length >= 3 && (
              <Panel label={`Contents · ${pad(toc.length)}`}>
                {toc.map((heading, i) => (
                  <a
                    key={heading.url}
                    href={heading.url}
                    className="focus-ring flex min-h-[44px] items-start gap-3 border-b border-panel-line px-4.5 py-2.5 font-mono text-[11px] leading-[1.5] tracking-[0.04em] text-text-secondary transition-colors last:border-b-0 hover:text-signal dark:border-panel-dark-line dark:text-text-inverse-secondary"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 pt-px text-text-tertiary dark:text-text-inverse-tertiary"
                    >
                      {pad(i + 1)}
                    </span>
                    <span className="min-w-0">{heading.value}</span>
                  </a>
                ))}
              </Panel>
            )}

            <NewsletterForm label="Get the ship log" section={`post_${slug}`} />

            <div className="flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary">
              <Link
                href={discussUrl(path)}
                rel="nofollow"
                className="focus-ring inline-flex min-h-[44px] items-center hover:text-signal"
              >
                Discuss on X →
              </Link>
              <Link
                href={editUrl(filePath)}
                className="focus-ring inline-flex min-h-[44px] items-center hover:text-signal"
              >
                View source on GitHub →
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* ─── 01 The author ──────────────────────────────────── */}
      {author && (
        <section className="border-b border-panel-line px-5 py-10 dark:border-panel-dark-line md:px-10 md:py-12">
          <SectionHeader numeral="01" title="The author" />
          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-start md:gap-7">
            {author.avatar && (
              <div className="w-[72px] shrink-0 border border-panel-line p-1.5 dark:border-panel-dark-line">
                <Image
                  src={author.avatar}
                  width={72}
                  height={72}
                  alt={author.name}
                  className="block w-full"
                />
              </div>
            )}
            <div className="min-w-0">
              <p className="font-display text-[22px] font-bold tracking-[-0.02em] text-text-primary dark:text-text-inverse">
                {author.name}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary">
                {[author.occupation, author.company].filter(Boolean).join(' · ')}
              </p>
              <p className="mt-4 max-w-[56ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
                I build small software instruments and write down what the work actually costs.
              </p>
              <div className="mt-6 flex flex-wrap gap-5 font-mono text-[10px] uppercase tracking-[0.16em]">
                {author.twitter && (
                  <Link
                    href={author.twitter}
                    className="focus-ring inline-flex min-h-[44px] items-center text-signal hover:text-signal-hover"
                  >
                    Follow on X →
                  </Link>
                )}
                <Link
                  href="/blog"
                  className="focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
                >
                  All {pad(totalEntries)} entries →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 02 Comments ────────────────────────────────────── */}
      {siteMetadata.comments && (
        <section
          id="comment"
          className="border-b border-panel-line px-5 py-10 dark:border-panel-dark-line md:px-10 md:py-12"
        >
          <SectionHeader numeral="02" title="Comments" meta="GitHub" />
          <div className="mt-8">
            <Comments slug={slug} />
          </div>
        </section>
      )}

      {/* ─── Prev / next ────────────────────────────────────── */}
      <nav className="flex flex-col gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.16em] md:flex-row md:items-center md:px-10">
        {prev && prev.path ? (
          <Link
            href={`/${prev.path}`}
            className="focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
          >
            ← Entry {entryNumber(prev.slug)} · {prev.title}
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-stone">
            ← Start of the archive
          </span>
        )}
        <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />
        {next && next.path ? (
          <Link
            href={`/${next.path}`}
            className="focus-ring inline-flex min-h-[44px] items-center text-right text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
          >
            Entry {entryNumber(next.slug)} · {next.title} →
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-stone">Newest entry →</span>
        )}
      </nav>
    </>
  )
}
