import { ReactNode } from 'react'
import Image from '@/components/Image'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionHeader from '@/components/SectionHeader'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import siteMetadata from '@/data/siteMetadata'
import { entryNumber } from '../lib/entries'

interface PostRef {
  path: string
  slug: string
  title: string
}

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: PostRef
  prev?: PostRef
}

export default function PostBanner({ content, next, prev, children }: LayoutProps) {
  const { slug, date, title, images } = content
  const serial = entryNumber(slug)
  const minutes = Math.max(1, Math.round(content.readingTime?.minutes ?? 1))
  const displayImage = images && images.length > 0 ? images[0] : null

  return (
    <>
      <ScrollTopAndComment />

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
        {displayImage && (
          <div className="relative aspect-[2/1] w-full border-b border-panel-line dark:border-panel-dark-line">
            <Image src={displayImage} alt={title} fill className="object-cover" />
          </div>
        )}

        <header className="border-b border-panel-line px-5 py-12 dark:border-panel-dark-line md:px-10 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-7">
            <span
              aria-hidden="true"
              className="font-display text-[48px] font-bold leading-[0.85] tracking-[-0.05em] text-text-tertiary dark:text-text-inverse-tertiary md:text-[84px]"
            >
              {serial}
            </span>
            <div className="min-w-0">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
        </header>

        <div className="border-b border-panel-line px-5 py-12 dark:border-panel-dark-line md:px-10 md:py-14">
          <div className="prose max-w-[72ch] dark:prose-invert">{children}</div>
        </div>
      </article>

      {siteMetadata.comments && (
        <section
          id="comment"
          className="border-b border-panel-line px-5 py-10 dark:border-panel-dark-line md:px-10 md:py-12"
        >
          <SectionHeader numeral="01" title="Comments" meta="GitHub" />
          <div className="mt-8">
            <Comments slug={slug} />
          </div>
        </section>
      )}

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
            className="focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
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
