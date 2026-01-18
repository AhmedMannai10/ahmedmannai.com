import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import projectsData from '@/data/projectsData'

const MAX_DISPLAY = 5

export default function Home({ posts }) {
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <>
      {/* Hero Section */}
      <section className="mb-20 space-y-8 pt-8 md:mb-32 md:pt-16">
        <div className="flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-6">
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Hello, I'm <span className="text-black dark:text-white">{siteMetadata.author}</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-gray-700 dark:text-gray-300 md:text-2xl">
              {siteMetadata.description}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              I love building and anything related to technology. I approach problems in a rational,
              pragmatic way and seek the simplest, most functional solutions possible.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/about"
                className="inline-flex items-center rounded-md border border-black bg-black px-6 py-3 text-base font-medium text-white transition-all hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-100"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-md border border-black px-6 py-3 text-base font-medium text-black transition-all hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-900"
              >
                View Projects
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-6">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Connect:</span>
              <div className="flex items-center gap-3">
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
                <SocialIcon kind="x" href={siteMetadata.x} size={6} />
                <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border border-gray-200 dark:border-gray-800 lg:h-80 lg:w-80">
              <Image
                src={siteMetadata.authorInfo?.image || '/static/images/avatar.png'}
                alt={siteMetadata.author}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="mb-20 md:mb-32">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="font-display text-3xl font-bold text-black dark:text-white md:text-4xl">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-black dark:hover:shadow-dark-md"
              >
                {project.imgSrc && (
                  <div className="relative h-48 overflow-hidden bg-gray-50 dark:bg-gray-900">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8">
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
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
                  <p className="mb-6 text-gray-600 dark:text-gray-400">{project.description}</p>
                  {(project.slug || project.href) && (
                    <Link
                      href={project.slug ? `/projects/${project.slug}` : project.href || '#'}
                      target={project.slug ? undefined : '_blank'}
                      rel={project.slug ? undefined : 'noopener noreferrer'}
                      className="inline-flex items-center font-medium text-black underline underline-offset-4 hover:no-underline dark:text-white"
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

      {/* Skills Section */}
      <section className="mb-20 rounded-lg border border-gray-200 bg-gray-50 p-8 dark:border-gray-800 dark:bg-gray-900 md:mb-32 md:p-12">
        <h2 className="mb-8 font-display text-3xl font-bold text-black dark:text-white md:text-4xl">
          Technical Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
              Languages & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Java', 'React', 'Next.js', 'Django', 'JavaScript', 'Python'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">
              DevOps & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'Kubernetes', 'AWS', 'Azure', 'Dynatrace', 'Prometheus', 'Grafana'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-black dark:text-white">Other Skills</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Performance Engineering',
                'Jmeter',
                'NeoLoad',
                'Selenium',
                'Appium',
                'Load Testing',
                'Load Runner',
                'Supabase',
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-black dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Latest Section */}
      <section className="divide-y divide-gray-200 dark:divide-gray-800">
        <div className="space-y-3 pb-10 pt-8 md:space-y-4">
          <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-black dark:text-white sm:text-4xl md:text-5xl">
            Latest Posts
          </h2>
          <p className="text-lg leading-7 text-gray-600 dark:text-gray-400">
            Thoughts, tutorials, and insights on software development and technology
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-6 xl:col-span-3">
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-2xl font-semibold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-black hover:underline dark:text-white"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-600 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-black underline underline-offset-4 hover:no-underline dark:text-white"
                          aria-label={`Read more: "${title}"`}
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
          <div className="flex justify-end pt-10 text-base font-medium leading-6">
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
      {siteMetadata.newsletter?.provider && (
        <section className="mt-20 rounded-lg border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-black md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-display text-2xl font-bold text-black dark:text-white md:text-3xl">
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
