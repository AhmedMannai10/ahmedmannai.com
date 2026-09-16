import Link from '@/components/Link'
import SectionHeader from '@/components/SectionHeader'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { pad, totalEntries } from '../../lib/entries'

export const metadata = genPageMetadata({
  title: 'Tags',
  description:
    'Browse posts by topic: AI-assisted development, Claude Code, DevOps, Terraform and Azure, Flutter, indie hacking, and shell/Linux productivity.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort(
    (a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b)
  )

  return (
    <>
      {/* ─── Intro ────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_320px]">
        <div className="px-5 py-14 md:px-10 md:py-20">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary dark:text-text-inverse-tertiary">
            <span aria-hidden="true" className="h-px w-10 bg-signal" />
            Index · Topics
          </p>
          <h1
            className="mt-7 font-display font-bold leading-[0.96] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 3.625rem)' }}
          >
            Topics
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
            Every label in the archive, busiest first. An app slug — skillscan, tantap, sportzme —
            collects that unit&rsquo;s devlog.
          </p>
        </div>
        <div className="border-t border-panel-line px-5 py-8 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-10">
          <SectionHeader numeral="01" title="Topics" meta={`${pad(sortedTags.length)} total`} />
        </div>
      </section>

      {/* ─── Topic matrix ─────────────────────────────────────── */}
      {sortedTags.length === 0 ? (
        <p className="border-b border-panel-line px-5 py-12 font-mono text-[11px] uppercase tracking-[0.16em] text-stone dark:border-panel-dark-line md:px-10">
          No topics found
        </p>
      ) : (
        <div className="overflow-hidden border-b border-panel-line dark:border-panel-dark-line">
          <div className="-mb-px -mr-px grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {sortedTags.map((t, i) => (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                aria-label={`View posts tagged ${t}`}
                className="focus-ring group flex min-h-[96px] flex-col justify-between border-b border-r border-panel-line px-5 py-4 transition-colors hover:bg-panel-sub dark:border-panel-dark-line dark:hover:bg-panel-dark-sub"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary dark:text-text-inverse-tertiary"
                >
                  {pad(i + 1)}
                </span>
                <span className="mt-5 flex items-baseline justify-between gap-3">
                  <span className="min-w-0 break-words font-display text-[17px] font-bold tracking-[-0.02em] text-text-primary group-hover:text-signal dark:text-text-inverse">
                    {t}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-text-tertiary dark:text-text-inverse-tertiary">
                    {pad(tagCounts[t])}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ─── Closing rule ─────────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-5 py-6 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:text-text-inverse-tertiary md:flex-row md:items-center md:px-10">
        <span className="inline-flex min-h-[44px] items-center">
          {pad(totalEntries)} entries · {pad(sortedTags.length)} topics
        </span>
        <span aria-hidden="true" className="tick-rule-h hidden h-1 flex-1 md:block" />
        <Link
          href="/blog"
          className="focus-ring inline-flex min-h-[44px] items-center text-signal hover:text-signal-hover"
        >
          The whole archive →
        </Link>
      </div>
    </>
  )
}
