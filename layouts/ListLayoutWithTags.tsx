/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import AmbientGlow from '@/components/AmbientGlow'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="pb-8 pt-6">
      <nav className="flex items-center justify-between">
        {!prevPage ? (
          <button
            className="cursor-auto rounded-full border border-stone/15 px-5 py-2 text-sm font-medium text-stone/40"
            disabled
          >
            ← Previous
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="focus-ring rounded-full border border-stone/20 px-5 py-2 text-sm font-medium text-ink transition-all hover:border-stone/40 hover:bg-stone/5 dark:text-bone"
          >
            ← Previous
          </Link>
        )}
        <span className="text-sm text-stone">
          {currentPage} / {totalPages}
        </span>
        {!nextPage ? (
          <button
            className="cursor-auto rounded-full border border-stone/15 px-5 py-2 text-sm font-medium text-stone/40"
            disabled
          >
            Next →
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="focus-ring rounded-full border border-stone/20 px-5 py-2 text-sm font-medium text-ink transition-all hover:border-stone/40 hover:bg-stone/5 dark:text-bone"
          >
            Next →
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow className="-top-20 left-1/2 h-[350px] w-[500px] -translate-x-1/2" />

      {/* Page header */}
      <div className="pb-8 pt-16 sm:hidden">
        <p className="mb-3 font-mono text-xs text-stone">
          <span className="text-signal dark:text-signal-dark">$</span> writing
        </p>
        <h1
          className="font-display font-semibold tracking-tight text-ink dark:text-bone"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          {title}
        </h1>
      </div>

      <div className="flex sm:space-x-10">
        {/* Tag sidebar */}
        <div className="hidden h-full max-h-screen min-w-[240px] max-w-[240px] flex-wrap overflow-auto rounded-2xl border border-stone/15 bg-paper pt-5 dark:border-stone/20 dark:bg-graphite sm:flex">
          <div className="px-5 py-4">
            {/* Page header (desktop, inside sidebar) */}
            <div className="mb-5 border-b border-stone/15 pb-5">
              <p className="mb-1 font-mono text-xs text-stone">
                <span className="text-signal dark:text-signal-dark">$</span> writing
              </p>
              <h1
                className="font-display font-semibold tracking-tight text-ink dark:text-bone"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                {title}
              </h1>
            </div>

            {/* All posts link */}
            {pathname.startsWith('/blog') ? (
              <p className="mb-3 text-sm font-bold text-ink dark:text-bone">All Posts</p>
            ) : (
              <Link
                href="/blog"
                className="focus-ring mb-3 block rounded text-sm font-bold text-stone hover:text-ink hover:underline dark:hover:text-bone"
              >
                All Posts
              </Link>
            )}

            {/* Tags */}
            <ul className="space-y-1">
              {sortedTags.map((t) => {
                const isActive = pathname.split('/tags/')[1] === slug(t)
                return (
                  <li key={t}>
                    {isActive ? (
                      <span className="flex items-center justify-between rounded-full bg-signal px-3 py-1.5 text-xs font-medium text-paper dark:bg-signal-dark dark:text-graphite">
                        <span className="uppercase">{t}</span>
                        <span className="ml-2 opacity-60">{tagCounts[t]}</span>
                      </span>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="focus-ring flex items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium uppercase text-stone transition-all hover:bg-stone/10 hover:text-ink dark:hover:text-bone"
                        aria-label={`View posts tagged ${t}`}
                      >
                        <span>{t}</span>
                        <span className="ml-2 opacity-50">{tagCounts[t]}</span>
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Post list */}
        <div className="min-w-0 flex-1">
          <ul className="space-y-4 pt-6">
            {displayPosts.map((post) => {
              const { path, date, title, summary, tags } = post
              return (
                <li key={path}>
                  <article className="group rounded-2xl border border-stone/15 bg-paper p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone/30 hover:shadow-lg dark:border-stone/20 dark:bg-graphite dark:hover:border-stone/40 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]">
                    <time
                      dateTime={date}
                      className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-stone"
                      suppressHydrationWarning
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    <h2 className="mb-2 text-xl font-bold tracking-tight">
                      <Link
                        href={`/${path}`}
                        className="focus-ring rounded text-ink hover:underline dark:text-bone"
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tags?.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-stone">{summary}</p>
                    <div className="mt-4">
                      <Link
                        href={`/${path}`}
                        className="focus-ring inline-flex items-center gap-1 rounded text-xs font-semibold text-stone transition-colors group-hover:text-ink dark:group-hover:text-bone"
                      >
                        Read more
                        <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          {pagination && pagination.totalPages > 1 && (
            <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
          )}
        </div>
      </div>
    </div>
  )
}
