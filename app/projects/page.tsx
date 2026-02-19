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
    <>
      {/* Page header — inverted hierarchy: big decorative name, small descriptor below */}
      <div className="pb-12 pt-10">
        <h1 className="font-lobster text-5xl font-normal text-black dark:text-white sm:text-6xl md:text-7xl">
          The Lab
        </h1>
        <p className="mt-2 text-xs uppercase tracking-widest text-gray-400 dark:text-gray-600">
          Projects
        </p>
        <p className="mt-4 text-base text-gray-500 dark:text-gray-400">Four things I've shipped.</p>
      </div>

      {/* Alternating project rows */}
      <div className="pb-16">
        {projectsData.map((project, index) => {
          const isOdd = index % 2 !== 0
          const projectNumber = String(index + 1).padStart(2, '0')

          return (
            <div key={project.title}>
              {index > 0 && <div className="border-t border-gray-100 dark:border-gray-900" />}

              <div
                className={[
                  'group relative flex flex-col gap-8 py-12 md:items-center md:gap-12',
                  isOdd ? 'md:flex-row-reverse' : 'md:flex-row',
                ].join(' ')}
              >
                {/* Ghost background number */}
                <span className="project-number-bg" aria-hidden="true">
                  {projectNumber}
                </span>

                {/* Image */}
                {project.imgSrc && (
                  <div className="relative overflow-hidden rounded-xl md:w-[48%]">
                    <div className="relative h-56 md:h-64">
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
                  <h2 className="mb-3 text-2xl font-bold leading-snug text-black dark:text-white">
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
                  <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    {project.slug && (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 rounded-md border border-black bg-black px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
                      >
                        View Project →
                      </Link>
                    )}
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-gray-500 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
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
    </>
  )
}
