import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import AdSenseAd from '@/components/AdSenseAd'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-100 xl:dark:divide-gray-900">
          {/* Article header */}
          <header className="pb-8 pt-10 xl:pb-8">
            <div className="space-y-4 text-center">
              {/* Date eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </p>
              {/* Title */}
              <PageTitle>{title}</PageTitle>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-gray-100 pb-8 dark:divide-gray-900 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0">
            {/* Sidebar — author */}
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-100 xl:pt-11 xl:dark:border-gray-900">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li className="flex items-center space-x-3" key={author.name}>
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={40}
                          height={40}
                          alt="avatar"
                          className="h-10 w-10 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-black dark:text-white">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-xs text-gray-500 underline underline-offset-4 hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
                            >
                              {author.twitter
                                .replace('https://twitter.com/', '@')
                                .replace('https://x.com/', '@')}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>
            </dl>

            {/* Main content */}
            <div className="divide-y divide-gray-100 dark:divide-gray-900 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>

              {/* Post-read author card */}
              <div className="py-8">
                {authorDetails.map((author) => (
                  <div
                    key={author.name}
                    className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-gray-50/50 p-6 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/50"
                  >
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={48}
                        height={48}
                        alt={author.name}
                        className="h-12 w-12 flex-shrink-0 rounded-full ring-2 ring-gray-100 dark:ring-gray-800"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-black dark:text-white">{author.name}</p>
                      <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                        Software & DevOps Engineer · Builder · Writer
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="inline-flex items-center rounded-full border border-black bg-black px-4 py-1.5 text-xs font-semibold text-white transition-all hover:scale-[1.02] hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                          >
                            Follow on X →
                          </Link>
                        )}
                        <Link
                          href="/blog"
                          className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1.5 text-xs font-semibold text-gray-600 transition-all hover:scale-[1.02] hover:border-gray-400 hover:text-black dark:border-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-white"
                        >
                          More posts →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-6 pt-4 text-sm text-gray-400 dark:text-gray-600">
                <Link
                  href={discussUrl(path)}
                  rel="nofollow"
                  className="hover:text-black hover:underline dark:hover:text-white"
                >
                  Discuss on Twitter
                </Link>
                {` · `}
                <Link
                  href={editUrl(filePath)}
                  className="hover:text-black hover:underline dark:hover:text-white"
                >
                  View on GitHub
                </Link>
              </div>

              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-600 dark:text-gray-400"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
            </div>

            {/* Sidebar footer — tags + prev/next */}
            <footer>
              <div className="divide-gray-100 text-sm font-medium leading-5 dark:divide-gray-900 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      Tags
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between gap-4 py-4 xl:block xl:space-y-6 xl:py-8">
                    {prev && prev.path && (
                      <div className="flex-1">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                          Previous
                        </h2>
                        <Link
                          href={`/${prev.path}`}
                          className="block rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-gray-700"
                        >
                          ← {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="flex-1">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                          Next
                        </h2>
                        <Link
                          href={`/${next.path}`}
                          className="block rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm font-medium text-black transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:hover:border-gray-700"
                        >
                          {next.title} →
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="pt-4 xl:pt-8">
                <Link
                  href={`/${basePath}`}
                  className="inline-flex items-center rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-600 transition-all hover:border-gray-400 hover:text-black dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white"
                  aria-label="Back to the blog"
                >
                  ← Back to blog
                </Link>
                <div className="mt-6">
                  <AdSenseAd />
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
