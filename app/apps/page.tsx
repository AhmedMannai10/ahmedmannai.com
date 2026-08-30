import appsData from '@/data/appsData'
import AppsIndex from '@/components/AppsIndex'
import SectionHeader from '@/components/SectionHeader'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Apps',
  description:
    'Every unit on the workbench, in the field or in between — SportzMe, TanTap and SkillScan. Each keeps its serial number for good.',
})

export default function Apps() {
  return (
    <>
      {/* ─── Intro ────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 border-b border-panel-line dark:border-panel-dark-line md:grid-cols-[1fr_320px]">
        <div className="px-5 py-14 md:px-10 md:py-20">
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-text-tertiary dark:text-text-inverse-tertiary">
            <span aria-hidden="true" className="h-px w-10 bg-signal" />
            Index · All units
          </p>
          <h1
            className="mt-7 font-display font-bold leading-[0.96] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 3.625rem)' }}
          >
            The apps
          </h1>
          <p className="mt-6 max-w-[52ch] text-base leading-[1.65] text-text-secondary dark:text-text-inverse-secondary">
            Everything on the workbench, in the field or in between. Each unit keeps its serial
            number for good — nothing gets renumbered when something new arrives.
          </p>
        </div>
        <div className="border-t border-panel-line px-5 py-8 dark:border-panel-dark-line md:border-l md:border-t-0 md:px-8 md:py-10">
          <SectionHeader numeral="01" title="Units" meta={`${appsData.length} total`} />
        </div>
      </section>

      {/* ─── Filter + unit rows ───────────────────────────────── */}
      <AppsIndex apps={appsData} />
    </>
  )
}
