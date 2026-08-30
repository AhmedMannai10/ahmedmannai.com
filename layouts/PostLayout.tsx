import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ReadingContainer from '@/components/ReadingContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

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
    <ReadingContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-stone/15">
          {/* Article header */}
          <header className="pb-8 pt-10 xl:pb-8">
            <div className="space-y-4 text-center">
              {/* Date eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                </time>
              </p>
              {/* Title */}
              <PageTitle>{title}</PageTitle>
            </div>
          </header>

          <div className="grid-rows-[auto_1fr] divide-y divide-stone/15 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-8 xl:divide-y-0">
            {/* Sidebar — author */}
            <dl className="pb-10 pt-6 xl:border-b xl:border-stone/15 xl:pt-11">
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
                          className="h-10 w-10 rounded-full ring-2 ring-stone/15"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-ink dark:text-bone">{author.name}</dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="focus-ring rounded text-xs text-stone underline underline-offset-4 hover:text-ink hover:no-underline dark:hover:text-bone"
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
            <div className="divide-y divide-stone/15 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>

              {/* Post-read author card */}
              <div className="py-8">
                {authorDetails.map((author) => (
                  <div
                    key={author.name}
                    className="flex items-start gap-4 rounded-2xl border border-stone/15 bg-stone/5 p-6"
                  >
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={48}
                        height={48}
                        alt={author.name}
                        className="h-12 w-12 flex-shrink-0 rounded-full ring-2 ring-stone/15"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink dark:text-bone">{author.name}</p>
                      <p className="mt-0.5 text-sm text-stone">
                        Software & DevOps Engineer · Builder · Writer
                      </p>
                      <div className="mt-4 flex flex-wrap gap-3">
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="focus-ring inline-flex items-center rounded-full bg-ink px-4 py-1.5 text-xs font-semibold text-paper transition-all hover:scale-[1.02] hover:opacity-90 dark:bg-bone dark:text-graphite"
                          >
                            Follow on X →
                          </Link>
                        )}
                        <Link
                          href="/blog"
                          className="focus-ring inline-flex items-center rounded-full border border-stone/20 px-4 py-1.5 text-xs font-semibold text-stone transition-all hover:scale-[1.02] hover:border-stone/40 hover:text-ink dark:hover:text-bone"
                        >
                          More posts →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pb-6 pt-4 text-sm text-stone">
                <Link
                  href={discussUrl(path)}
                  rel="nofollow"
                  className="focus-ring rounded hover:text-ink hover:underline dark:hover:text-bone"
                >
                  Discuss on Twitter
                </Link>
                {` · `}
                <Link
                  href={editUrl(filePath)}
                  className="focus-ring rounded hover:text-ink hover:underline dark:hover:text-bone"
                >
                  View on GitHub
                </Link>
              </div>

              {siteMetadata.comments && (
                <div className="pb-6 pt-6 text-center text-stone" id="comment">
                  <Comments slug={slug} />
                </div>
              )}
            </div>

            {/* Sidebar footer — tags + prev/next */}
            <footer>
              <div className="divide-stone/15 text-sm font-medium leading-5 xl:col-start-1 xl:row-start-2 xl:divide-y">
                {tags && (
                  <div className="py-4 xl:py-8">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
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
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                          Previous
                        </h2>
                        <Link
                          href={`/${prev.path}`}
                          className="focus-ring block rounded-xl border border-stone/15 bg-paper p-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-stone/30 hover:shadow-md dark:border-stone/20 dark:bg-graphite dark:text-bone"
                        >
                          ← {prev.title}
                        </Link>
                      </div>
                    )}
                    {next && next.path && (
                      <div className="flex-1">
                        <h2 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                          Next
                        </h2>
                        <Link
                          href={`/${next.path}`}
                          className="focus-ring block rounded-xl border border-stone/15 bg-paper p-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-stone/30 hover:shadow-md dark:border-stone/20 dark:bg-graphite dark:text-bone"
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
                  className="focus-ring inline-flex items-center rounded-full border border-stone/15 px-4 py-1.5 text-sm font-medium text-stone transition-all hover:border-stone/40 hover:text-ink dark:hover:text-bone"
                  aria-label="Back to the blog"
                >
                  ← Back to blog
                </Link>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </ReadingContainer>
  )
}
