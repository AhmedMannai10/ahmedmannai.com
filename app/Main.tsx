'use client'

import posthog from '../lib/posthog-browser'
import Link from '@/components/Link'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import AppUnit from '@/components/AppUnit'
import StatusDot from '@/components/StatusDot'
import ScreenFrame from '@/components/ScreenFrame'
import SectionHeader from '@/components/SectionHeader'
import NewsletterForm from '@/components/NewsletterForm'
import appsData, { liveCount, buildingCount, lastShip, currentFocus } from '@/data/appsData'
import { videosData } from '@/data/videosData'

// Ships per quarter, oldest to newest. The last bar is the current quarter.
const SHIPS_PER_QUARTER = [28, 46, 38, 70, 55, 100]
const FEED_COUNT = 4

const SECTION = 'border-b border-panel-line dark:border-panel-dark-line'
const PAD = 'px-5 md:px-10'

export default function Home({ posts }) {
  const fieldApps = appsData.filter((a) => a.status !== 'building')
  const benchApp = appsData.find((a) => a.status === 'building')

  // Writing & video feed — merged from Contentlayer posts and videosData,
  // newest first. Never hardcoded.
  const feed = [
    ...posts.map((p) => ({ kind: 'TXT', title: p.title, date: p.date, href: `/blog/${p.slug}` })),
    ...videosData.map((v) => ({
      kind: 'VID',
      title: v.title,
      date: v.publishedAt,
      href: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    })),
  ]
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, FEED_COUNT)

  const readouts = [
    { value: String(liveCount).padStart(2, '0'), label: 'In the field' },
    { value: String(buildingCount).padStart(2, '0'), label: 'On the bench', signal: true },
    { value: lastShip || '—', label: 'Last ship', small: true },
    { value: (currentFocus || '—').toUpperCase(), label: 'Focus', small: true },
  ]

  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className={`${SECTION} grid grid-cols-1 md:grid-cols-[1fr_380px]`}>
        <div className={`${PAD} py-14 md:py-20`}>
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary dark:text-text-inverse-tertiary">
            <span aria-hidden="true" className="h-px w-10 bg-signal" />
            Independent software · Est. 2021
          </p>

          <h1
            className="mt-7 max-w-[12ch] font-display font-bold leading-[0.94] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 4.75rem)' }}
          >
            Three apps, built to be used.
          </h1>

          <p className="mt-7 max-w-[44ch] text-base leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
            Small software instruments, made with care. Two are in the field. One is on the bench,
            and you can watch it come together.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              href="/apps"
              variant="primary"
              onClick={() =>
                posthog.capture('cta_clicked', {
                  cta_name: 'hero_see_apps',
                  destination: '/apps',
                  section: 'hero',
                })
              }
            >
              See the apps
            </Button>
            <Button
              href={benchApp ? `/apps/${benchApp.slug}` : '/blog'}
              variant="secondary"
              onClick={() =>
                posthog.capture('cta_clicked', {
                  cta_name: 'hero_follow_build',
                  destination: benchApp ? `/apps/${benchApp.slug}` : '/blog',
                  section: 'hero',
                })
              }
            >
              Follow the build
            </Button>
          </div>
        </div>

        {/* PANEL A — workshop status */}
        <div
          className={`${PAD} border-t border-panel-line py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8`}
        >
          <Panel label="Panel A · Workshop status" indicator>
            {/* Ships per quarter */}
            <div className="px-4.5 pb-4 pt-5">
              <div className="flex h-[88px] items-end gap-2.5">
                {SHIPS_PER_QUARTER.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`w-4 ${
                      i === SHIPS_PER_QUARTER.length - 1
                        ? 'bg-signal'
                        : 'bg-panel-line dark:bg-panel-dark-line2'
                    }`}
                  />
                ))}
              </div>
              <div aria-hidden="true" className="tick-rule-h mt-2.5 h-1" />
              <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary">
                Ships per quarter
              </p>
            </div>

            {/* 2x2 readout */}
            <div className="grid grid-cols-2 border-t border-panel-line dark:border-panel-dark-line">
              {readouts.map((r, i) => (
                <div
                  key={r.label}
                  className={`px-4.5 py-4 dark:border-panel-dark-line ${
                    i % 2 === 0 ? 'border-r border-panel-line' : ''
                  } ${i < 2 ? 'border-b border-panel-line' : ''}`}
                >
                  <div
                    className={`font-display font-bold tracking-[-0.04em] ${
                      r.small ? 'text-[17px]' : 'text-[40px] leading-none'
                    } ${r.signal ? 'text-signal' : 'text-text-primary dark:text-text-inverse'}`}
                  >
                    {r.value}
                  </div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </section>

      {/* ─── 01 Apps ──────────────────────────────────────────── */}
      <section className={SECTION}>
        <div className={`${PAD} pt-10`}>
          <SectionHeader numeral="01" title="Apps" meta={`${appsData.length} units`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {fieldApps.map((app, i) => (
            <div
              key={app.slug}
              className={`border-panel-line dark:border-panel-dark-line ${
                i > 0 ? 'border-t md:border-l md:border-t-0' : ''
              }`}
            >
              <AppUnit app={app} variant="row" />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bench unit ───────────────────────────────────────── */}
      {benchApp && (
        <section className={`${SECTION} bg-panel-sub dark:bg-panel-dark-sub`}>
          <div className={`${PAD} py-12 md:py-16`}>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
              <div>
                <span
                  aria-hidden="true"
                  className="font-display text-[52px] font-bold leading-none tracking-[-0.05em] text-signal"
                >
                  {benchApp.serial}
                </span>
                <h2 className="mt-4 font-display text-[32px] font-bold tracking-[-0.03em] text-text-primary dark:text-text-inverse">
                  <Link href={`/apps/${benchApp.slug}`} className="focus-ring hover:text-signal">
                    {benchApp.name}
                  </Link>
                </h2>
                <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary">
                  <StatusDot status="building" />
                  <span className="before:mr-2 before:content-['·']">Mobile</span>
                  <span className="before:mr-2 before:content-['·']">No public link</span>
                </div>
                <p className="mt-5 max-w-[48ch] text-[15px] leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
                  {benchApp.description}
                </p>

                <div className="mt-8">
                  {(benchApp.spec || [])
                    .filter(
                      (row) => !['SER. NO.', 'STATUS', 'PLATFORM', 'STARTED'].includes(row.label)
                    )
                    .map((row) => (
                      <div
                        key={row.label}
                        className="flex justify-between gap-4 border-b border-panel-line py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] dark:border-panel-dark-line"
                      >
                        <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                          {row.label}
                        </span>
                        <span
                          className={
                            row.signal ? 'text-signal' : 'text-text-primary dark:text-text-inverse'
                          }
                        >
                          {row.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex items-start justify-center gap-4">
                {(benchApp.screenshots || []).slice(0, 2).map((shot) => (
                  <ScreenFrame
                    key={shot.src}
                    src={shot.src}
                    alt={`${benchApp.name} — ${shot.caption}`}
                    className="w-full max-w-[230px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 02 Writing & video ───────────────────────────────── */}
      <section className={SECTION}>
        <div className={`${PAD} pt-10`}>
          <SectionHeader numeral="02" title="Writing & video" meta={`${posts.length} posts`} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_360px]">
          <div className={`${PAD} py-9`}>
            <ul className="flex flex-col gap-1">
              {feed.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() =>
                      posthog.capture('featured_post_clicked', {
                        post_title: item.title,
                        kind: item.kind,
                        section: 'writing_and_video',
                      })
                    }
                    className="focus-ring group flex min-h-[44px] items-center gap-4"
                  >
                    <span className="min-w-6 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary">
                      {item.kind}
                    </span>
                    <span className="text-[15px] text-text-primary group-hover:text-signal dark:text-text-inverse">
                      {item.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="h-px flex-1 bg-panel-soft dark:bg-panel-dark-line"
                    />
                    <time
                      dateTime={item.date}
                      className="shrink-0 font-mono text-[11px] text-text-tertiary dark:text-text-inverse-tertiary"
                    >
                      {item.date.slice(0, 7)}
                    </time>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              onClick={() =>
                posthog.capture('cta_clicked', {
                  cta_name: 'writing_all_posts',
                  destination: '/blog',
                  section: 'writing_and_video',
                })
              }
              className="focus-ring mt-7 inline-flex min-h-[44px] items-center font-mono text-[11px] uppercase tracking-[0.16em] text-signal hover:text-signal-hover"
            >
              All {posts.length} posts →
            </Link>
          </div>

          <div
            className={`${PAD} border-t border-panel-line py-9 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8`}
          >
            <NewsletterForm label="Get the ship log" section="home_newsletter" />
            <p className="mt-4 max-w-[36ch] text-[15px] leading-[1.6] text-text-secondary dark:text-text-inverse-secondary">
              What shipped, what broke, and what is on the bench next.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
