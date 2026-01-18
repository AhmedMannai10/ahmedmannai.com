import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import projectsData from '@/data/projectsData'

const MAX_DISPLAY = 3

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 4)

  return (
    <>
      {/* Hero Section */}
      <section className="mb-32 space-y-6 pt-12 md:mb-40 md:pt-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-6xl font-bold leading-[1.1] tracking-tight text-black dark:text-white sm:text-7xl md:text-8xl lg:text-9xl">
            {siteMetadata.author}
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-400 md:text-2xl">
            {siteMetadata.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
            >
              About Me
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center text-base font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
            >
              View Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Brief Intro Section */}
      <section className="mb-32 max-w-3xl md:mb-40">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          I approach problems in a rational, pragmatic way and seek the simplest, most functional
          solutions possible. I love building software that makes a difference.
        </p>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="mb-32 md:mb-40">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-display text-4xl font-bold text-black dark:text-white md:text-5xl">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-base font-medium text-gray-600 underline underline-offset-4 hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-lg transition-all hover:shadow-subtle dark:hover:shadow-dark-subtle"
              >
                {project.imgSrc && (
                  <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div>
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
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {project.description.split('.')[0]}.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Blog Latest Section */}
      <section className="mb-32 md:mb-40">
        <div className="mb-12">
          <h2 className="mb-3 font-display text-4xl font-bold text-black dark:text-white md:text-5xl">
            Latest Posts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and insights on software development and technology
          </p>
        </div>
        <ul className="space-y-8">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            const summaryExcerpt = summary.split('.')[0] + '.'
            return (
              <li key={slug}>
                <article className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                    {tags.length > 0 && (
                      <>
                        <span>•</span>
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 2).map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold leading-tight text-black dark:text-white">
                    <Link href={`/blog/${slug}`} className="hover:underline">
                      {title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{summaryExcerpt}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center text-sm font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read more →
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
          <div className="mt-12">
            <Link
              href="/blog"
              className="text-base font-medium text-gray-600 underline underline-offset-4 hover:text-black hover:no-underline dark:text-gray-400 dark:hover:text-white"
              aria-label="All posts"
            >
              View all posts →
            </Link>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <section className="mb-32 md:mb-40">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="mb-3 font-display text-3xl font-bold text-black dark:text-white md:text-4xl">
              Stay Updated
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              Get the latest posts and updates delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </section>
      )}
    </>
  )
}
