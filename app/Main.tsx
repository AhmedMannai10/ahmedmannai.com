import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import projectsData from '@/data/projectsData'

const MAX_DISPLAY = 3

const IDENTITY_PILLS = ['Software Engineering', 'DevOps', 'Mobile Apps', 'Writing', 'Football']

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative mb-16 overflow-hidden pt-8 md:mb-24 md:pt-14">
        {/* Decorative gradient orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-10 h-80 w-80 rounded-full bg-violet-500 opacity-[0.08] blur-3xl dark:opacity-[0.06]" />
          <div className="absolute -bottom-10 right-0 h-72 w-72 rounded-full bg-pink-500 opacity-[0.08] blur-3xl dark:opacity-[0.05]" />
        </div>

        <div className="relative max-w-3xl">
          {/* Greeting row */}
          <div
            className="mb-6 flex animate-fade-in items-center gap-3"
            style={{ animationDelay: '0ms' }}
          >
            <Image
              src="/static/images/avatar.png"
              alt="Ahmed Mannai"
              width={52}
              height={52}
              className="h-13 w-13 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-800"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Hey, I'm Ahmed
              </span>
              <span
                className="inline-flex h-2 w-2 rounded-full bg-green-500"
                title="Available for opportunities"
              />
            </div>
          </div>

          {/* Name */}
          <h1
            className="animate-fade-in-up font-display text-5xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl"
            style={{ animationDelay: '100ms' }}
          >
            {siteMetadata.author}
          </h1>

          {/* Bio */}
          <p
            className="mt-5 max-w-xl animate-fade-in-up text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            Software & DevOps engineer who builds clean products and writes about the craft.
          </p>

          {/* Identity pills */}
          <div
            className="mt-5 flex animate-fade-in-up flex-wrap gap-2"
            style={{ animationDelay: '300ms' }}
          >
            {IDENTITY_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:border-gray-800 dark:text-gray-400"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="mt-8 flex animate-fade-in-up flex-wrap items-center gap-4"
            style={{ animationDelay: '380ms' }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Projects →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-black transition-all hover:border-black hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-white dark:hover:bg-gray-900"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Projects ───────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="mb-20 md:mb-28">
          {/* Section heading */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
                01 — Selected Work
              </p>
              <h2 className="font-display text-2xl font-bold text-black dark:text-white md:text-3xl">
                Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-gray-500 underline underline-offset-4 transition-colors hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
            >
              View All →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                {/* Featured badge */}
                {index === 0 && (
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-black px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-white dark:text-black">
                    Featured
                  </div>
                )}

                {project.imgSrc && (
                  <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                    {project.slug ? (
                      <Link href={`/projects/${project.slug}`} className="hover:underline">
                        {project.title}
                      </Link>
                    ) : project.href ? (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-1 text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
                    >
                      View Project →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Latest Posts ───────────────────────────────────── */}
      <section className="mb-16">
        {/* Section heading */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
              02 — Writing
            </p>
            <h2 className="font-display text-2xl font-bold text-black dark:text-white md:text-3xl">
              Latest Posts
            </h2>
          </div>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="text-sm font-medium text-gray-500 underline underline-offset-4 transition-colors hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
              aria-label="All posts"
            >
              All Posts →
            </Link>
          )}
        </div>

        {/* Card grid */}
        {!posts.length && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No posts found.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_8px_24px_rgba(255,255,255,0.03)]"
              >
                <time
                  dateTime={date}
                  className="mb-3 text-xs font-medium text-gray-400 dark:text-gray-600"
                >
                  {formatDate(date, siteMetadata.locale)}
                </time>
                <h3 className="mb-2 text-base font-semibold leading-snug text-black transition-colors group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-200">
                  {title}
                </h3>
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-gray-200 px-2 py-0.5 text-xs font-medium uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400"
                    >
                      {tag.split(' ').join('-')}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
