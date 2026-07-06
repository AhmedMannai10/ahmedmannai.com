import Link from '@/components/Link'
import AmbientGlow from '@/components/AmbientGlow'
import CalEmbed from '@/components/CalEmbed'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Book a Call',
  description:
    'Book a call with Ahmed Mannai — for founders who need a technical builder to ship a product or fix a system under load.',
})

export default function Book() {
  const calLink = siteMetadata.calLink

  return (
    <div className="relative overflow-hidden">
      <AmbientGlow className="-top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2" />

      <div className="pb-10 pt-16">
        <p className="mb-3 font-mono text-xs text-stone">
          <span className="text-signal dark:text-signal-dark">$</span> book --call
        </p>
        <h1
          className="font-display font-semibold leading-tight tracking-tight text-ink dark:text-bone"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Book a <span className="text-signal dark:text-signal-dark">Call.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
          If you're a founder trying to get a product from zero to shipped, or trying to figure out
          why your existing system falls over under real traffic, this is for you. I spend most
          calls doing two things: helping teams ship a first version fast, or finding and fixing the
          specific thing that's costing them users, uptime, or money at scale. Book 30 minutes below
          — tell me what you're building or what's breaking, and I'll tell you honestly whether I
          can help.
        </p>
      </div>

      <div className="border-t border-stone/15 pb-20 pt-10">
        {calLink ? (
          <>
            <div className="overflow-hidden rounded-xl border border-stone/15">
              <CalEmbed calLink={calLink} />
            </div>
            <p className="mt-4 text-center text-xs text-stone">
              No sales deck. Just a conversation about what you're building.
            </p>
          </>
        ) : (
          <div className="rounded-xl border border-stone/15 bg-paper p-8 text-center dark:border-stone/20 dark:bg-graphite">
            <p className="text-base text-stone">
              Online booking is being set up right now. In the meantime, email me directly at{' '}
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="focus-ring rounded font-semibold text-signal underline underline-offset-4 dark:text-signal-dark"
              >
                {siteMetadata.email}
              </Link>{' '}
              and I'll get back to you within a day.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
