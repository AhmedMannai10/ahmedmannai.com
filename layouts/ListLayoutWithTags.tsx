/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
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
            className="cursor-auto rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-300 dark:border-gray-800 dark:text-gray-700"
            disabled
          >
            ← Previous
          </button>
        ) : (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
          >
            ← Previous
          </Link>
        )}
        <span className="text-sm text-gray-400 dark:text-gray-500">
          {currentPage} / {totalPages}
        </span>
        {!nextPage ? (
          <button
            className="cursor-auto rounded-full border border-gray-200 px-5 py-2 text-sm font-medium text-gray-300 dark:border-gray-800 dark:text-gray-700"
            disabled
          >
            Next →
          </button>
        ) : (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
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
      {/* Atmospheric orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Page header */}
      <div className="pb-8 pt-16 sm:hidden">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
          Writing
        </p>
        <h1
          className="font-display font-bold tracking-tight text-black dark:text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          {title}
        </h1>
      </div>

      <div className="flex sm:space-x-10">
        {/* Tag sidebar */}
        <div className="hidden h-full max-h-screen min-w-[240px] max-w-[240px] flex-wrap overflow-auto rounded-2xl border border-gray-200 bg-white/60 pt-5 backdrop-blur-sm dark:border-gray-800 dark:bg-black/40 sm:flex">
          <div className="px-5 py-4">
            {/* Page header (desktop, inside sidebar) */}
            <div className="mb-5 border-b border-gray-100 pb-5 dark:border-gray-900">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Writing
              </p>
              <h1
                className="font-display font-bold tracking-tight text-black dark:text-white"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                {title}
              </h1>
            </div>

            {/* All posts link */}
            {pathname.startsWith('/blog') ? (
              <p className="mb-3 text-sm font-bold text-black dark:text-white">All Posts</p>
            ) : (
              <Link
                href="/blog"
                className="mb-3 block text-sm font-bold text-gray-500 hover:text-black hover:underline dark:text-gray-400 dark:hover:text-white"
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
                      <span className="flex items-center justify-between rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white dark:bg-white dark:text-black">
                        <span className="uppercase">{t}</span>
                        <span className="ml-2 opacity-60">{tagCounts[t]}</span>
                      </span>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="flex items-center justify-between rounded-full px-3 py-1.5 text-xs font-medium uppercase text-gray-500 transition-all hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
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
                  <article className="group rounded-2xl border border-gray-200 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-black/40 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]">
                    <time
                      dateTime={date}
                      className="mb-3 block font-mono text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500"
                      suppressHydrationWarning
                    >
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    <h2 className="mb-2 text-xl font-bold tracking-tight">
                      <Link
                        href={`/${path}`}
                        className="text-black hover:underline dark:text-white"
                      >
                        {title}
                      </Link>
                    </h2>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {tags?.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {summary}
                    </p>
                    <div className="mt-4">
                      <Link
                        href={`/${path}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 transition-colors group-hover:text-black dark:group-hover:text-white"
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
