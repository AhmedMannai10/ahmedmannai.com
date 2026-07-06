import projectsData from '@/data/projectsData'
import caseStudiesData from '@/data/caseStudiesData'
import Link from '@/components/Link'
import Image from '@/components/Image'
import Sparkline from '@/components/Sparkline'
import AmbientGlow from '@/components/AmbientGlow'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Products shipped and consulting case studies from Ahmed Mannai — live mobile apps, SaaS tools, and performance-engineering engagements.',
})

export default function Projects() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow className="-top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2" />

      {/* Page header */}
      <div className="pb-12 pt-16">
        <p className="mb-3 font-mono text-xs text-stone">
          <span className="text-signal dark:text-signal-dark">$</span> projects --all
        </p>
        <h1
          className="font-display font-semibold leading-tight tracking-tight text-ink dark:text-bone"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          The <span className="text-signal dark:text-signal-dark">Lab.</span>
        </h1>
        <p className="mt-4 max-w-md text-base text-stone">
          Things I've shipped — mobile apps, SaaS tools, and research projects.
        </p>
      </div>

      {/* Alternating project rows */}
      <div className="pb-20">
        {projectsData.map((project, index) => {
          const isOdd = index % 2 !== 0
          const projectNumber = String(index + 1).padStart(2, '0')

          return (
            <div key={project.title}>
              {index > 0 && <div className="border-t border-stone/15" />}

              <div
                className={[
                  'group relative flex flex-col gap-8 py-14 md:items-center md:gap-16',
                  isOdd ? 'md:flex-row-reverse' : 'md:flex-row',
                ].join(' ')}
              >
                {/* Image */}
                {project.imgSrc && (
                  <div className="relative overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 group-hover:shadow-xl dark:shadow-black/40 md:w-[48%]">
                    <div className="relative h-56 md:h-72">
                      <Image
                        src={project.imgSrc}
                        alt={project.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center md:w-[48%]">
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-stone/40">
                    {projectNumber}
                  </p>
                  <h2 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-ink dark:text-bone sm:text-3xl">
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
                  </h2>
                  <p className="mb-7 text-base leading-relaxed text-stone">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {project.slug && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal px-6 py-2.5 text-sm font-semibold text-paper shadow-lg shadow-signal/20 transition-all duration-200 hover:scale-[1.02] hover:bg-signal/90 dark:bg-signal-dark dark:text-graphite"
                      >
                        View Project →
                      </Link>
                    )}
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring inline-flex items-center gap-1 rounded-full border border-stone/20 bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:scale-[1.02] hover:border-stone/40 dark:border-stone/20 dark:bg-graphite dark:text-bone dark:hover:border-stone/40"
                      >
                        Visit ↗
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Consulting Engagements */}
      <div className="border-t border-stone/15 pb-20 pt-14">
        <div className="mb-10">
          <p className="mb-3 font-mono text-xs text-stone">
            <span className="text-signal dark:text-signal-dark">$</span> engagements --anonymized
          </p>
          <h2
            className="font-display font-semibold leading-tight tracking-tight text-ink dark:text-bone"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}
          >
            Selected <span className="text-signal dark:text-signal-dark">Engagements.</span>
          </h2>
          <p className="mt-4 max-w-md text-base text-stone">
            Client details anonymized — results are real. Performance and reliability work for teams
            under real load.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {caseStudiesData.map((caseStudy) => (
            <div
              key={caseStudy.title}
              className="flex flex-col rounded-xl border border-stone/15 bg-paper p-6 dark:border-stone/20 dark:bg-graphite"
            >
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-stone/40">
                Consulting Engagement
              </p>
              <h3 className="mb-2 text-lg font-bold leading-snug text-ink dark:text-bone">
                {caseStudy.title}
              </h3>
              <p className="mb-3 text-xs italic text-stone">{caseStudy.context}</p>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-stone">
                {caseStudy.description}
              </p>

              <div className="mb-4 rounded-lg border border-stone/15 bg-stone/5 p-3">
                <Sparkline points={caseStudy.trend} color={caseStudy.trendColor} height={48} />
                <div className="mt-1 flex items-center justify-between font-mono text-[11px] text-stone">
                  <span>{caseStudy.trendLabels[0]}</span>
                  <span
                    className={
                      caseStudy.trendColor === 'alert'
                        ? 'font-semibold text-alert dark:text-alert-dark'
                        : 'font-semibold text-signal dark:text-signal-dark'
                    }
                  >
                    {caseStudy.trendLabels[1]}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {caseStudy.metrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded-full border border-stone/15 bg-stone/5 px-3 py-1 text-xs font-medium text-stone"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <p className="text-xs text-stone/70">Stack: {caseStudy.stack.join(', ')}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
