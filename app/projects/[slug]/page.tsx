import { notFound } from 'next/navigation'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    return {}
  }

  const projectUrl = `${siteMetadata.siteUrl}/projects/${project.slug}`
  const projectImage = project.imgSrc
    ? project.imgSrc.startsWith('http')
      ? project.imgSrc
      : `${siteMetadata.siteUrl}${project.imgSrc}`
    : siteMetadata.socialBanner

  return {
    ...genPageMetadata({
      title: project.title,
      description: project.description,
      image: projectImage,
      alternates: {
        canonical: projectUrl,
      },
    }),
    openGraph: {
      ...genPageMetadata({
        title: project.title,
        description: project.description,
        image: projectImage,
      }).openGraph,
      url: projectUrl,
      type: 'website',
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <article className="divide-y divide-gray-200 dark:divide-gray-800">
      <header className="space-y-2 pb-10 pt-8">
        <div>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl">
            {project.title}
          </h1>
        </div>
      </header>
      <div className="divide-y divide-gray-200 pb-10 pt-8 dark:divide-gray-800">
        {project.imgSrc && (
          <div className="mb-10">
            <Image
              src={project.imgSrc}
              alt={project.title}
              width={1200}
              height={630}
              className="rounded-lg border border-gray-200 dark:border-gray-800"
            />
          </div>
        )}
        <div className="prose max-w-none pb-10 pt-8 text-gray-600 dark:text-gray-400">
          <p className="text-lg leading-7">{project.description}</p>
        </div>
        {project.href && (
          <div className="pt-8">
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Project →
            </Link>
          </div>
        )}
        <div className="pt-8">
          <Link
            href="/projects"
            className="font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    </article>
  )
}
