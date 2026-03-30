import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import projectsData from '@/data/projectsData'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

const STATS = [
  { label: '4+ Years', sublabel: 'Experience' },
  { label: '10+', sublabel: 'Projects Shipped' },
  { label: 'Open Source', sublabel: 'Contributor' },
  { label: 'Football', sublabel: 'Enthusiast' },
]

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 3)

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative mb-16 overflow-hidden pt-8 md:mb-24 md:pt-14">
        {/* Radial gradient background accent */}
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
              alt="Ahmed Mannai — Software & DevOps Engineer"
              width={48}
              height={48}
              className="rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-800"
            />
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Hey, I'm Ahmed
            </span>
          </div>

          {/* Name — editorial scale */}
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

          {/* Bio — keyword-rich tagline */}
          <p
            className="mt-8 max-w-sm animate-fade-in-up border-l-2 border-gray-200 pl-4 text-base leading-relaxed text-gray-500 dark:border-gray-800 dark:text-gray-400"
            style={{ animationDelay: '220ms' }}
          >
            Software & DevOps Engineer building web apps, mobile products, and open source tools. I
            document the journey here.
          </p>

          {/* Stats / Highlights bar */}
          <div
            className="mt-6 grid animate-fade-in-up grid-cols-2 gap-3 sm:grid-cols-4"
            style={{ animationDelay: '300ms' }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 dark:border-gray-800 dark:bg-gray-950"
              >
                <p className="text-sm font-bold text-black dark:text-white">{stat.label}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{stat.sublabel}</p>
              </div>
            ))}
          </div>

          {/* CTAs */}
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

          {/* Equal 3-column card grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                {project.imgSrc && (
                  <div className="relative h-44 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-300 dark:text-gray-700">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-2 text-base font-semibold leading-snug text-black dark:text-white">
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
                  <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-1 self-start text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
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
      <section className="mb-20 md:mb-28">
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

        {!posts.length && (
          <p className="text-sm text-gray-500 dark:text-gray-400">No posts found.</p>
        )}

        {/* Card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                className="group flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                <time
                  dateTime={date}
                  className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600"
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <p className="mb-2 flex-1 text-sm font-semibold leading-snug text-black dark:text-white">
                  {title}
                </p>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {summary}
                </p>
                <span className="inline-flex items-center gap-1 self-start text-xs font-medium text-gray-400 transition-colors group-hover:text-black dark:group-hover:text-white">
                  Read
                  <span className="inline-block transition-transform duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* ─── Newsletter + Follow ─────────────────────────────── */}
      <section className="mb-16">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            Building in public
          </div>
          <h2 className="mb-2 font-display text-xl font-bold text-black dark:text-white sm:text-2xl">
            Follow along as I build.
          </h2>
          <p className="mb-6 max-w-md text-sm text-gray-500 dark:text-gray-400">
            Devlogs, project updates, and notes from the lab. No spam — just what I'm shipping.
          </p>

          {/* Newsletter signup */}
          <div className="mb-6">
            <NewsletterForm />
          </div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={siteMetadata.x}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              Follow on X
            </Link>
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-black transition-all hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
