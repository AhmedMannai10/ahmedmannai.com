import Link from '@/components/Link'
import Panel from '@/components/Panel'
import Button from '@/components/Button'
import CalEmbed from '@/components/CalEmbed'
import { Dot } from '@/components/StatusDot'
import SectionHeader from '@/components/SectionHeader'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Book a Call',
  description:
    'Book a call with Ahmed Mannai — for founders who need a technical builder to ship a product, and for teams whose systems are breaking under real load.',
})

const SPEC: { label: string; value: string; signal?: boolean }[] = [
  { label: 'Format', value: 'Video call' },
  { label: 'Duration', value: '30 min' },
  { label: 'Focus', value: '0→1 builds · systems under load' },
  { label: 'Response', value: '< 24h', signal: true },
]

export default function Book() {
  const calLink = siteMetadata.calLink

  return (
    <>
      {/* ─── Breadcrumb ───────────────────────────────────────── */}
      <div className="flex items-center justify-between gap-4 border-b border-panel-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:border-panel-dark-line dark:text-text-inverse-tertiary md:px-10">
        <span className="flex items-center gap-2">
          <Link href="/" className="focus-ring hover:text-signal">
            Index
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text-primary dark:text-text-inverse">Book a call</span>
        </span>
        <span className="flex items-center gap-2">
          <Dot status="live" />
          Open for calls
        </span>
      </div>

      {/* ─── Title + specification ───────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_420px]">
        <div className="px-5 py-12 md:px-10 md:py-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary dark:text-text-inverse-tertiary">
            <span className="text-signal">$</span> book --call
          </p>

          <h1
            className="mt-7 font-display font-bold leading-[0.95] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw, 3.5rem)' }}
          >
            Book a <span className="text-signal">call.</span>
          </h1>

          <p className="mt-8 max-w-[56ch] text-base leading-[1.7] text-text-secondary dark:text-text-inverse-secondary">
            If you're a founder trying to get a product from zero to shipped, or trying to figure
            out why your existing system falls over under real traffic, this is for you. I spend
            most calls doing one of two things: helping teams ship a first version fast, or finding
            and fixing the specific thing that's costing them users, uptime, or money at scale. Book
            30 minutes below — tell me what you're building or what's breaking, and I'll tell you
            honestly whether I can help.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="#schedule" variant="primary">
              Schedule a call
            </Button>
            <Button href={`mailto:${siteMetadata.email}`} variant="secondary">
              Email instead
            </Button>
          </div>
        </div>

        <div className="border-t border-panel-line px-5 py-10 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8">
          <Panel label="Specification" indicator>
            {SPEC.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-4 border-b border-panel-line px-4.5 py-3.5 font-mono text-[11px] uppercase tracking-[0.1em] last:border-b-0 dark:border-panel-dark-line"
              >
                <span className="text-text-tertiary dark:text-text-inverse-tertiary">
                  {row.label}
                </span>
                <span
                  className={`text-right ${
                    row.signal ? 'text-signal' : 'text-text-primary dark:text-text-inverse'
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </Panel>
        </div>
      </section>

      {/* ─── Schedule ─────────────────────────────────────────── */}
      <section id="schedule" className="scroll-mt-4 px-5 py-10 md:px-10 md:py-12">
        <SectionHeader numeral="01" title="Schedule" meta={calLink ? 'Cal.com' : 'Manual'} />

        <div className="mt-8">
          {calLink ? (
            <>
              <Panel>
                <CalEmbed calLink={calLink} />
              </Panel>
              <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary">
                No sales deck. Just a conversation about what you're building.
              </p>
            </>
          ) : (
            <Panel className="p-8 text-center">
              <p className="text-base leading-[1.7] text-text-secondary dark:text-text-inverse-secondary">
                Online booking is being set up right now. In the meantime, email me directly at{' '}
                <Link
                  href={`mailto:${siteMetadata.email}`}
                  className="focus-ring font-semibold text-signal underline underline-offset-4"
                >
                  {siteMetadata.email}
                </Link>{' '}
                and I'll get back to you within a day.
              </p>
            </Panel>
          )}
        </div>
      </section>
    </>
  )
}
