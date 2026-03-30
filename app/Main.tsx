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
      <section className="relative flex min-h-[calc(100vh-4rem)] flex-col">
        {/* Full-viewport atmospheric background — breaks out of the container */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10"
          style={{
            top: 0,
            bottom: 0,
            left: 'calc(50% - 50vw)',
            width: '100vw',
          }}
        >
          <div
            className="absolute left-1/2 top-0 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full opacity-60 blur-[140px]"
            style={{
              background:
                'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, rgba(59,130,246,0.08) 50%, transparent 70%)',
            }}
          />
          <div
            className="absolute bottom-0 left-[10%] h-[45vh] w-[45vw] rounded-full opacity-40 blur-[110px]"
            style={{ background: 'rgba(99,102,241,0.14)' }}
          />
          <div
            className="absolute bottom-0 right-[10%] h-[45vh] w-[45vw] rounded-full opacity-40 blur-[110px]"
            style={{ background: 'rgba(168,85,247,0.12)' }}
          />
        </div>

        {/* Main content — vertically centered */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8 pt-16 text-center sm:px-6 lg:px-8">
          {/* Avatar */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="relative inline-block">
              <Image
                src="/static/images/avatar.png"
                alt="Ahmed Mannai"
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              {/* Online indicator */}
              <span className="absolute bottom-0.5 right-0.5 block h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 dark:border-black" />
            </div>
          </div>

          {/* Eyebrow label */}
          <p
            className="mb-5 animate-fade-in text-xs font-semibold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500"
            style={{ animationDelay: '60ms' }}
          >
            Software & DevOps Engineer
          </p>

          {/* Headline — massive, Apple-weight */}
          <h1
            className="mx-auto max-w-4xl animate-fade-in-up font-display font-bold leading-[1.05] tracking-[-0.03em] text-black dark:text-white"
            style={{
              animationDelay: '120ms',
              fontSize: 'clamp(2.75rem, 8vw, 6rem)',
            }}
          >
            Building what
            <br />
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #000 0%, #6366f1 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="dark:hidden"
            >
              matters.
            </span>
            <span
              style={{
                backgroundImage: 'linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              className="hidden dark:inline"
            >
              matters.
            </span>
          </h1>

          {/* Tagline */}
          <p
            className="mx-auto mt-7 max-w-lg animate-fade-in-up text-lg leading-relaxed text-gray-500 dark:text-gray-400 sm:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            Web apps. Mobile products. DevOps infrastructure.
            <br className="hidden sm:block" />
            Crafted with precision, shipped with purpose.
          </p>

          {/* CTAs */}
          <div
            className="mt-10 flex animate-fade-in-up flex-wrap justify-center gap-4"
            style={{ animationDelay: '320ms' }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full border border-black bg-black px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-gray-100"
            >
              View Projects
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-full border border-gray-300 bg-white/60 px-7 py-3.5 text-sm font-semibold text-black backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-black/40 dark:text-white dark:hover:border-gray-500 dark:hover:bg-black/60"
            >
              Read Blog
            </Link>
          </div>
        </div>

        {/* Stats strip — pinned to bottom, full width */}
        <div
          className="animate-fade-in border-t border-gray-100 dark:border-gray-900"
          style={{ animationDelay: '480ms' }}
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 dark:divide-gray-900 sm:grid-cols-4 sm:divide-y-0">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-5">
                <span className="text-xl font-bold tracking-tight text-black dark:text-white">
                  {stat.label}
                </span>
                <span className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                  {stat.sublabel}
                </span>
              </div>
            ))}
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
