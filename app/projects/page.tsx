import projectsData from '@/data/projectsData'
import Link from '@/components/Link'
import Image from '@/components/Image'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'Explore projects created by Ahmed Mannai — from live mobile apps and SaaS tools to research experiments.',
})

export default function Projects() {
  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, rgba(59,130,246,0.05) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Page header */}
      <div className="pb-12 pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
          Selected Work
        </p>
        <h1
          className="font-display font-bold leading-tight tracking-tight text-black dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          The{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Lab.
          </span>
        </h1>
        <p className="mt-4 max-w-md text-base text-gray-500 dark:text-gray-400">
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
              {index > 0 && <div className="border-t border-gray-100 dark:border-gray-900" />}

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
                  <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gray-300 dark:text-gray-700">
                    {projectNumber}
                  </p>
                  <h2 className="mb-3 text-2xl font-bold leading-snug tracking-tight text-black dark:text-white sm:text-3xl">
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
                  </h2>
                  <p className="mb-7 text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {project.slug && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-black bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-gray-100"
                      >
                        View Project →
                      </Link>
                    )}
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-gray-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-black backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-black/40 dark:text-white dark:hover:border-gray-500 dark:hover:bg-black/60"
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
    </div>
  )
}
