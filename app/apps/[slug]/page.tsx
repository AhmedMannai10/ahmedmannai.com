import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { slug as slugify } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'

import Link from '@/components/Link'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import { Dot } from '@/components/StatusDot'
import ScreenFrame from '@/components/ScreenFrame'
import SectionHeader from '@/components/SectionHeader'
import NewsletterForm from '@/components/NewsletterForm'
import appsData from '@/data/appsData'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

const DEVLOG_COUNT = 4

export async function generateStaticParams() {
  return appsData.map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const app = appsData.find((a) => a.slug === params.slug)
  if (!app) return {}

  const url = `${siteMetadata.siteUrl}/apps/${app.slug}`
  const image = app.screenshots?.[0]?.src
    ? `${siteMetadata.siteUrl}${app.screenshots[0].src}`
    : undefined

  return {
    ...genPageMetadata({
      title: app.name,
      description: app.description,
      image,
      alternates: { canonical: url },
    }),
  }
}

export default function AppDetail({ params }: { params: { slug: string } }) {
  const app = appsData.find((a) => a.slug === params.slug)
  if (!app) notFound()

  const isBuilding = app.status === 'building'
  const index = appsData.findIndex((a) => a.slug === app.slug)
  const prev = appsData[index - 1]
  const next = appsData[index + 1]

  const devlog = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) => !post.draft && (post.tags || []).map((t) => slugify(t)).includes(app.slug || '')
      )
    )
  ).slice(0, DEVLOG_COUNT)

  const paragraphs = app.detail?.length ? app.detail : [app.description]

  return (
    <>
      {/* ─── Breadcrumb ───────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b border-panel-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:border-panel-dark-line dark:text-text-inverse-tertiary md:px-10">
        <span className="flex items-center gap-2">
          <Link href="/apps" className="focus-ring hover:text-signal">
            Apps
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text-primary dark:text-text-inverse">
            Ser. no. {app.serial} · {app.name}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <Dot status={app.status} />
          <span className={isBuilding ? 'text-signal' : ''}>{app.status.toUpperCase()}</span>
        </span>
      </div>

      {/* ─── Title + specification ────────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_420px]">
        <div className="px-5 py-12 md:px-10 md:py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-7">
            <span
              aria-hidden="true"
              className={`font-display text-[56px] font-bold leading-[0.85] tracking-[-0.05em] md:text-[84px] ${
                isBuilding ? 'text-signal' : 'text-text-tertiary dark:text-text-inverse-tertiary'
              }`}
            >
              {app.serial}
            </span>
            <div className="min-w-0">
              <h1
                className="font-display font-bold leading-[0.95] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
                style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)' }}
              >
                {app.name}
              </h1>
              {app.role && (
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary">
                  {app.role}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            {paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="max-w-[56ch] text-base leading-[1.7] text-text-secondary dark:text-text-inverse-secondary"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            {app.href ? (
              <Button href={app.href} variant="primary">
                Open {app.linkLabel} →
              </Button>
            ) : (
              <Button href="#devlog" variant="primary">
                Follow the build
              </Button>
            )}
            <Button href="#devlog" variant="secondary">
              Read the devlog
            </Button>
          </div>
        </div>

        <div className="border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8">
          <Panel label="Specification" indicator>
            {(app.spec || []).map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] last:border-b-0 dark:border-panel-dark-line"
              >
                <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                  {row.label}
                </span>
                <span
                  className={`flex items-center gap-2 text-right ${
                    row.signal ? 'text-signal' : 'text-text-primary dark:text-text-inverse'
                  }`}
                >
                  {row.label === 'STATUS' && <Dot status={app.status} />}
                  {row.value}
                </span>
              </div>
            ))}

            {isBuilding && typeof app.buildProgress === 'number' && (
              <div className="border-t border-panel-line px-4.5 py-4 dark:border-panel-dark-line">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary">
                  <span>Build progress</span>
                  <span className="text-signal">{app.buildProgress}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full bg-panel-soft dark:bg-panel-dark-line">
                  <div className="h-full bg-signal" style={{ width: `${app.buildProgress}%` }} />
                </div>
                <div aria-hidden="true" className="tick-rule-h mt-2.5 h-1" />
              </div>
            )}
          </Panel>
        </div>
      </section>

      {/* ─── 01 Readouts ──────────────────────────────────────── */}
      {!!app.screenshots?.length && (
        <section className="border-b border-panel-line bg-panel-sub px-5 py-10 dark:border-panel-dark-line dark:bg-panel-dark-sub md:px-10 md:py-12">
          <SectionHeader
            numeral="01"
            title="Readouts"
            meta={`${String(app.screenshots.length).padStart(2, '0')} screens`}
          />
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3">
            {app.screenshots.map((shot, i) => (
              <figure
                key={shot.src}
                className={shot.wide ? 'col-span-2 md:col-span-3' : 'mx-auto w-full max-w-[240px]'}
              >
                <ScreenFrame
                  src={shot.src}
                  alt={`${app.name} — ${shot.caption}`}
                  ratio={shot.ratio}
                  wide={shot.wide}
                  priority={i === 0}
                />
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ─── 02 Devlog + milestones ───────────────────────────── */}
      <section
        id="devlog"
        className="grid scroll-mt-4 grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_360px]"
      >
        <div className="px-5 py-10 md:px-10 md:py-12">
          <SectionHeader
            numeral="02"
            title="Devlog"
            meta={`${devlog.length} ${devlog.length === 1 ? 'entry' : 'entries'}`}
          />

          <div className="mt-8">
            {devlog.length === 0 ? (
              <p className="border-t border-panel-line py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-stone dark:border-panel-dark-line">
                No devlog entries yet
              </p>
            ) : (
              devlog.map((post) => (
                <article
                  key={post.slug}
                  className="grid grid-cols-[20px_1fr] gap-x-3 border-t border-panel-line py-6 dark:border-panel-dark-line md:grid-cols-[96px_20px_1fr]"
                >
                  <time
                    dateTime={post.date}
                    className="order-2 self-center font-mono text-[11px] uppercase tracking-[0.1em] text-text-tertiary dark:text-text-inverse-tertiary md:order-none md:self-start md:pt-1.5"
                  >
                    {post.date.slice(0, 10)}
                  </time>
                  <span
                    aria-hidden="true"
                    className="order-1 h-[7px] w-[7px] self-center bg-signal md:order-none md:mt-5.5 md:self-start md:justify-self-center"
                  />
                  <div className="order-3 col-span-2 mt-3 md:order-none md:col-span-1 md:mt-0">
                    <h3 className="font-display text-[17px] font-bold text-text-primary dark:text-text-inverse">
                      <Link href={`/blog/${post.slug}`} className="focus-ring hover:text-signal">
                        {post.title}
                      </Link>
                    </h3>
                    {post.summary && (
                      <p className="mt-2 max-w-[56ch] text-sm leading-[1.6] text-text-secondary dark:text-text-inverse-secondary">
                        {post.summary}
                      </p>
                    )}
                  </div>
                </article>
              ))
            )}

            <div className="border-t border-panel-line dark:border-panel-dark-line">
              <Link
                href={`/tags/${app.slug}`}
                className="focus-ring inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.16em] text-signal hover:text-signal-hover"
              >
                Full devlog →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-12">
          {!!app.milestones?.length && (
            <Panel label="Milestones">
              {app.milestones.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] last:border-b-0 dark:border-panel-dark-line"
                >
                  <span
                    className={`flex items-center gap-2.5 ${
                      m.state === 'todo' ? 'text-stone' : 'text-text-primary dark:text-text-inverse'
                    }`}
                  >
                    <Dot
                      status={
                        m.state === 'done' ? 'live' : m.state === 'now' ? 'building' : 'paused'
                      }
                    />
                    {m.name}
                  </span>
                  <span
                    className={
                      m.state === 'now'
                        ? 'text-signal'
                        : m.state === 'todo'
                          ? 'text-stone'
                          : 'text-text-tertiary dark:text-text-inverse-tertiary'
                    }
                  >
                    {m.state === 'done' ? 'Done' : m.state === 'now' ? 'Now' : m.when || 'TBD'}
                  </span>
                </div>
              ))}
            </Panel>
          )}

          <div className={app.milestones?.length ? 'mt-8' : ''}>
            <NewsletterForm
              label={isBuilding ? 'Get the beta invite' : 'Get the ship log'}
              section={`app_${app.slug}`}
            />
          </div>
        </div>
      </section>

      {/* ─── Prev / next ──────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.16em] md:flex-row md:items-center md:px-10">
        {prev ? (
          <Link
            href={`/apps/${prev.slug}`}
            className="focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
          >
            ← Ser. no. {prev.serial} · {prev.name}
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-stone">← Start of index</span>
        )}
        <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />
        {next ? (
          <Link
            href={`/apps/${next.slug}`}
            className="focus-ring inline-flex min-h-[44px] items-center text-text-secondary hover:text-signal dark:text-text-inverse-secondary"
          >
            Ser. no. {next.serial} · {next.name} →
          </Link>
        ) : (
          <span className="inline-flex min-h-[44px] items-center text-stone">
            Ser. no. {String(appsData.length + 1).padStart(2, '0')} · TBD
          </span>
        )}
      </div>
    </>
  )
}
