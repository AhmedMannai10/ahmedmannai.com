import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
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
        {/* Single precise radial gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 0% 0%, rgba(124,58,237,0.07) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-3xl">
          {/* Greeting row */}
          <div
            className="mb-6 flex animate-fade-in items-center gap-3"
            style={{ animationDelay: '0ms' }}
          >
            <Image
              src="/static/images/avatar.png"
              alt="Ahmed Mannai"
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-800"
            />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hey, I'm Ahmed
            </span>
          </div>

          {/* Name — editorial scale, split across two intentional lines */}
          <h1
            className="animate-fade-in-up font-display font-bold leading-[0.88] tracking-[-0.04em] text-black dark:text-white"
            style={{ animationDelay: '100ms' }}
          >
            <span className="block text-7xl sm:text-8xl md:text-9xl">Ahmed</span>
            <span className="block text-7xl sm:text-8xl md:text-9xl">
              Mannai
              <span className="text-gray-300 dark:text-gray-700">.</span>
            </span>
          </h1>

          {/* Bio — editorial left-border treatment */}
          <p
            className="mt-8 max-w-sm animate-fade-in-up border-l-2 border-gray-200 pl-4 text-base leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400"
            style={{ animationDelay: '220ms' }}
          >
            I build things, ship products, and document the journey. This is my lab.
          </p>

          {/* Identity pills — dashed border signals "in progress / active" */}
          <div
            className="mt-5 flex animate-fade-in-up flex-wrap gap-2"
            style={{ animationDelay: '300ms' }}
          >
            {IDENTITY_PILLS.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-dashed border-gray-300 px-3 py-1 text-xs font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
              >
                {pill}
              </span>
            ))}
          </div>

          {/* CTAs — primary arrow slides right on hover */}
          <div
            className="mt-8 flex animate-fade-in-up flex-wrap items-center gap-4"
            style={{ animationDelay: '380ms' }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Projects
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
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

          {/* Asymmetric grid: first card spans full width, second occupies left half only */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* First project — full-width horizontal editorial card */}
            {featuredProjects[0] && (
              <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)] md:col-span-2">
                <div className="flex flex-col md:flex-row">
                  {featuredProjects[0].imgSrc && (
                    <div className="relative h-56 overflow-hidden bg-gray-50 dark:bg-gray-900 md:h-72 md:w-[55%]">
                      <Image
                        src={featuredProjects[0].imgSrc}
                        alt={featuredProjects[0].title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:bg-gradient-to-r" />
                    </div>
                  )}
                  <div className="flex flex-col justify-center p-8 md:w-[45%]">
                    <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-300 dark:text-gray-700">
                      01
                    </p>
                    <h3 className="mb-3 text-xl font-bold leading-snug text-black dark:text-white">
                      {featuredProjects[0].slug ? (
                        <Link
                          href={`/projects/${featuredProjects[0].slug}`}
                          className="hover:underline"
                        >
                          {featuredProjects[0].title}
                        </Link>
                      ) : featuredProjects[0].href ? (
                        <Link
                          href={featuredProjects[0].href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {featuredProjects[0].title}
                        </Link>
                      ) : (
                        featuredProjects[0].title
                      )}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {featuredProjects[0].description}
                    </p>
                    {(featuredProjects[0].slug || featuredProjects[0].href) && (
                      <Link
                        href={
                          featuredProjects[0].slug
                            ? `/projects/${featuredProjects[0].slug}`
                            : featuredProjects[0].href || '#'
                        }
                        target={featuredProjects[0].slug ? undefined : '_blank'}
                        rel={featuredProjects[0].slug ? undefined : 'noopener noreferrer'}
                        className="inline-flex items-center gap-1 self-start text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
                      >
                        View Project →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Second project — standard card, left half only; right cell = intentional white space */}
            {featuredProjects[1] && (
              <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]">
                {featuredProjects[1].imgSrc && (
                  <div className="relative h-44 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={featuredProjects[1].imgSrc}
                      alt={featuredProjects[1].title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}
                <div className="p-6">
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-300 dark:text-gray-700">
                    02
                  </p>
                  <h3 className="mb-2 text-base font-semibold text-black dark:text-white">
                    {featuredProjects[1].slug ? (
                      <Link
                        href={`/projects/${featuredProjects[1].slug}`}
                        className="hover:underline"
                      >
                        {featuredProjects[1].title}
                      </Link>
                    ) : featuredProjects[1].href ? (
                      <Link
                        href={featuredProjects[1].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {featuredProjects[1].title}
                      </Link>
                    ) : (
                      featuredProjects[1].title
                    )}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {featuredProjects[1].description}
                  </p>
                  {(featuredProjects[1].slug || featuredProjects[1].href) && (
                    <Link
                      href={
                        featuredProjects[1].slug
                          ? `/projects/${featuredProjects[1].slug}`
                          : featuredProjects[1].href || '#'
                      }
                      target={featuredProjects[1].slug ? undefined : '_blank'}
                      rel={featuredProjects[1].slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-1 text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
                    >
                      View Project →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── Latest Posts ───────────────────────────────────── */}
      <section className="mb-16">
        <div className="mb-6 flex items-end justify-between">
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

        {!posts.length && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No posts found.</p>
        )}

        {/* Editorial list */}
        <div className="divide-y divide-gray-100 dark:divide-gray-900">
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group -mx-4 flex items-start gap-6 rounded-lg px-4 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-950/50"
              >
                <time
                  dateTime={date}
                  className="w-20 flex-shrink-0 pt-0.5 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600"
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-black dark:text-white">{title}</p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                    {summary}
                  </p>
                </div>
                <span className="flex-shrink-0 pt-0.5 text-sm text-gray-400 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:text-gray-600">
                  →
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── Follow the journey ──────────────────────────── */}
      <section className="mb-16">
        <div className="border-l-4 border-black py-2 pl-6 dark:border-white">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            Building in public
          </p>
          <h2 className="font-display text-xl font-bold text-black dark:text-white sm:text-2xl">
            Follow along as I build.
          </h2>
          <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
            I share devlogs, project updates, and notes from the lab. No spam — just what I'm
            building.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={siteMetadata.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              Follow on X
            </Link>
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
