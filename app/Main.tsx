import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import Image from '@/components/Image'
import projectsData from '@/data/projectsData'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <section className="relative mb-12 overflow-hidden pt-6 md:mb-16 md:pt-10">
        {/* Decorative gradient orbs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-20 -top-10 h-72 w-72 rounded-full bg-violet-500 opacity-[0.07] blur-3xl dark:opacity-[0.05]" />
          <div className="absolute -bottom-10 right-0 h-64 w-64 rounded-full bg-pink-500 opacity-[0.07] blur-3xl dark:opacity-[0.04]" />
        </div>

        <div className="relative max-w-3xl">
          {/* Status badge */}
          <div
            className="mb-5 inline-flex animate-fade-in items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300"
            style={{ animationDelay: '0ms' }}
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available for opportunities
          </div>

          {/* Name */}
          <h1
            className="animate-fade-in-up font-display text-5xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl"
            style={{ animationDelay: '100ms' }}
          >
            {siteMetadata.author}
          </h1>

          {/* Bio */}
          <p
            className="mt-5 max-w-2xl animate-fade-in-up text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl"
            style={{ animationDelay: '220ms' }}
          >
            {siteMetadata.description}
          </p>

          {/* Dual CTAs */}
          <div
            className="mt-8 flex animate-fade-in-up flex-wrap items-center gap-4"
            style={{ animationDelay: '340ms' }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Projects →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-black transition-all hover:border-black hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-white dark:hover:bg-gray-900"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-black dark:text-white md:text-3xl">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-sm font-medium text-gray-600 underline underline-offset-4 transition-colors hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700 dark:hover:shadow-[0_10px_30px_rgba(255,255,255,0.04)]"
              >
                {/* Featured badge on first card */}
                {index === 0 && (
                  <div className="absolute left-3 top-3 z-10 rounded-full bg-black px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-white dark:text-black">
                    Featured
                  </div>
                )}

                {project.imgSrc && (
                  <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
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
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center gap-1 text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
                    >
                      View Project →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blog Latest Section */}
      <section className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="pb-6 pt-6">
          <h2 className="font-display text-2xl font-bold text-black dark:text-white md:text-3xl">
            Latest Posts
          </h2>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-8">
                <article>
                  <div className="space-y-3 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-xs font-medium leading-5 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3 xl:col-span-3">
                      <div>
                        <h2 className="text-xl font-semibold leading-7 tracking-tight">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-black hover:underline dark:text-white"
                          >
                            {title}
                          </Link>
                        </h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                      <p className="line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {summary}
                      </p>
                      <div className="text-sm font-medium">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-black underline underline-offset-4 hover:no-underline dark:text-white"
                        >
                          Read more →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end pt-6 text-sm font-medium">
            <Link
              href="/blog"
              className="text-black underline underline-offset-4 hover:no-underline dark:text-white"
              aria-label="All posts"
            >
              All Posts →
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
