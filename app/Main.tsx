import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'
import projectsData from '@/data/projectsData'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <section className="mb-12 pt-6 md:mb-16 md:pt-10">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl">
            {siteMetadata.author}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400 md:text-xl">
            {siteMetadata.description}
          </p>
          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              View Projects
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
              className="font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-black"
              >
                {project.imgSrc && (
                  <div className="relative h-40 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover"
                    />
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
                  <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
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

      {/* Newsletter Section */}
      {/* {siteMetadata.newsletter?.provider && (
        <section className="mt-12 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-black md:p-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 font-display text-xl font-bold text-black dark:text-white md:text-2xl">
              Stay Updated
            </h2>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
              Get the latest posts and updates delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </section>
      )} */}
    </>
  )
}
