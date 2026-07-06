'use client'

import Link from '@/components/Link'
import posthog from '../lib/posthog-browser'
import siteMetadata from '@/data/siteMetadata'
import Image from '@/components/Image'
import Sparkline from '@/components/Sparkline'
import AmbientGlow from '@/components/AmbientGlow'
import projectsData from '@/data/projectsData'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 3

const STATS = [
  { label: '58%', sublabel: 'Capacity Gain, 1 Load Test' },
  { label: '53%', sublabel: 'Crash-Rate Reduction' },
  { label: '$1k MRR', sublabel: 'Plan In Progress' },
  { label: '2', sublabel: 'Products Shipped' },
]

const CAPACITY_TREND = [30, 28, 34, 26, 40, 55, 70, 88, 95]

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 3)
  const featuredPosts = posts.filter((post) => post.featured)
  const displayPosts = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, MAX_DISPLAY)

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-16 pt-16 md:pb-24 md:pt-24">
        <AmbientGlow className="-right-24 -top-16 h-[32rem] w-[32rem]" />

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10">
          {/* Left — copy */}
          <div className="animate-fade-in-up">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-stone">
              <span className="text-signal dark:text-signal-dark">{'>'}</span> Software &amp;
              Performance Engineer
            </p>

            <h1
              className="font-display font-semibold leading-[1.08] tracking-tight text-ink dark:text-bone"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)' }}
            >
              Builds what founders ship.
              <br />
              Fixes what quietly breaks.
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-stone sm:text-lg">
              0→1 product builds for founders, and performance engineering for systems already under
              load.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/book"
                onClick={() =>
                  posthog.capture('cta_clicked', {
                    cta_name: 'hero_book_call',
                    destination: '/book',
                    section: 'hero',
                  })
                }
                className="focus-ring group inline-flex items-center gap-2 rounded-full bg-signal px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-signal/20 transition-all duration-200 hover:scale-[1.02] hover:bg-signal/90 dark:bg-signal-dark dark:text-graphite dark:shadow-signal-dark/10"
              >
                Book a Call
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/projects"
                onClick={() =>
                  posthog.capture('cta_clicked', {
                    cta_name: 'hero_view_projects',
                    destination: '/projects',
                    section: 'hero',
                  })
                }
                className="focus-ring inline-flex items-center rounded-full border border-stone/20 bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-200 hover:scale-[1.02] hover:border-stone/40 dark:border-stone/20 dark:bg-graphite dark:text-bone dark:hover:border-stone/40"
              >
                View Projects
              </Link>
            </div>
          </div>

          {/* Right — readout panel (signature element) */}
          <div
            className="animate-fade-in-up rounded-2xl border border-stone/15 bg-paper/70 p-6 backdrop-blur-sm dark:border-stone/20 dark:bg-graphite/50"
            style={{ animationDelay: '160ms' }}
          >
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-stone">
              {'// live readout'}
            </p>
            <Sparkline points={CAPACITY_TREND} height={72} />
            <div className="mt-1 flex items-center justify-between font-mono text-xs text-stone">
              <span>1,200 users</span>
              <span className="font-semibold text-signal dark:text-signal-dark">1,900 users</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone/15 bg-stone/15 dark:border-stone/20 dark:bg-stone/20">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-paper/90 p-4 dark:bg-graphite/60">
                  <div className="font-mono text-lg font-semibold text-ink dark:text-bone">
                    {stat.label}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-snug text-stone">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Projects ───────────────────────────────────────── */}
      {featuredProjects.length > 0 && (
        <section className="mb-20 md:mb-28">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="mb-1 font-mono text-xs text-stone">
                <span className="text-signal dark:text-signal-dark">$</span> projects
              </p>
              <h2 className="font-display text-2xl font-semibold text-ink dark:text-bone md:text-3xl">
                Projects
              </h2>
            </div>
            <Link
              href="/projects"
              onClick={() =>
                posthog.capture('cta_clicked', {
                  cta_name: 'projects_view_all',
                  destination: '/projects',
                  section: 'projects',
                })
              }
              className="focus-ring rounded text-sm font-medium text-stone underline underline-offset-4 transition-colors hover:text-ink hover:no-underline dark:hover:text-bone"
            >
              View All →
            </Link>
          </div>

          {/* Equal 3-column card grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <div
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-stone/15 bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-stone/30 hover:shadow-lg dark:border-stone/20 dark:bg-graphite dark:hover:border-stone/40 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                {project.imgSrc && (
                  <div className="relative h-44 overflow-hidden bg-stone/10">
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
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-stone/40">
                    {String(idx + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mb-2 text-base font-semibold leading-snug text-ink dark:text-bone">
                    {project.slug ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="focus-ring rounded hover:underline"
                      >
                        {project.title}
                      </Link>
                    ) : project.href ? (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring rounded hover:underline"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-stone">
                    {project.description}
                  </p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      onClick={() =>
                        posthog.capture('cta_clicked', {
                          cta_name: 'project_card_view',
                          destination: project.slug ? `/projects/${project.slug}` : project.href,
                          project_title: project.title,
                          section: 'projects',
                        })
                      }
                      className="focus-ring inline-flex items-center gap-1 self-start rounded text-sm font-medium text-ink underline underline-offset-4 hover:no-underline dark:text-bone"
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

      {/* ─── Featured Writing ───────────────────────────────── */}
      <section className="mb-20 md:mb-28">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-1 font-mono text-xs text-stone">
              <span className="text-signal dark:text-signal-dark">$</span> writing
            </p>
            <h2 className="font-display text-2xl font-semibold text-ink dark:text-bone md:text-3xl">
              Featured Writing
            </h2>
          </div>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              onClick={() =>
                posthog.capture('cta_clicked', {
                  cta_name: 'writing_all_posts',
                  destination: '/blog',
                  section: 'writing',
                })
              }
              className="focus-ring rounded text-sm font-medium text-stone underline underline-offset-4 transition-colors hover:text-ink hover:no-underline dark:hover:text-bone"
              aria-label="All posts"
            >
              All Posts →
            </Link>
          )}
        </div>

        {!displayPosts.length && <p className="text-sm text-stone">No posts found.</p>}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {displayPosts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary } = post
            return (
              <Link
                key={slug}
                href={`/blog/${slug}`}
                onClick={() =>
                  posthog.capture('featured_post_clicked', {
                    post_slug: slug,
                    post_title: title,
                    section: 'featured_writing',
                  })
                }
                className="focus-ring group flex flex-col rounded-xl border border-stone/15 bg-paper p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-stone/30 hover:shadow-lg dark:border-stone/20 dark:bg-graphite dark:hover:border-stone/40 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                <time
                  dateTime={date}
                  className="mb-3 font-mono text-xs uppercase tracking-widest text-stone"
                >
                  {new Date(date).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <p className="mb-2 flex-1 text-sm font-semibold leading-snug text-ink dark:text-bone">
                  {title}
                </p>
                <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-stone">{summary}</p>
                <span className="inline-flex items-center gap-1 self-start text-xs font-medium text-stone transition-colors group-hover:text-ink dark:group-hover:text-bone">
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
        <div className="rounded-xl border border-stone/15 bg-paper p-8 dark:border-stone/20 dark:bg-graphite">
          <div className="mb-1 font-mono text-xs uppercase tracking-widest text-stone">
            Building in public
          </div>
          <h2 className="mb-2 font-display text-xl font-semibold text-ink dark:text-bone sm:text-2xl">
            Follow along as I build.
          </h2>
          <p className="mb-6 max-w-md text-sm text-stone">
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
              onClick={() =>
                posthog.capture('social_link_clicked', {
                  social_network: 'x',
                  destination: siteMetadata.x,
                  section: 'follow',
                })
              }
              className="focus-ring inline-flex items-center rounded-md border border-stone/20 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-stone/40 hover:bg-stone/5 dark:text-bone dark:hover:bg-stone/10"
            >
              Follow on X
            </Link>
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture('social_link_clicked', {
                  social_network: 'github',
                  destination: siteMetadata.github,
                  section: 'follow',
                })
              }
              className="focus-ring inline-flex items-center rounded-md border border-stone/20 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-stone/40 hover:bg-stone/5 dark:text-bone dark:hover:bg-stone/10"
            >
              GitHub
            </Link>
            <Link
              href={siteMetadata.youtube || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                posthog.capture('social_link_clicked', {
                  social_network: 'youtube',
                  destination: siteMetadata.youtube,
                  section: 'follow',
                })
              }
              className="focus-ring inline-flex items-center rounded-md border border-stone/20 px-4 py-2 text-sm font-medium text-ink transition-all hover:border-stone/40 hover:bg-stone/5 dark:text-bone dark:hover:bg-stone/10"
            >
              Watch on YouTube
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
