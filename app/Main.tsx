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
      <section className="mb-16 space-y-6 pt-6 md:mb-24 md:pt-12">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-darkGreen-900 dark:text-cream-100 sm:text-5xl md:text-6xl lg:text-7xl">
              Hello, I'm{' '}
              <span className="text-primary-600 dark:text-primary-400">{siteMetadata.author}</span>
            </h1>
            <p className="max-w-2xl text-xl leading-relaxed text-darkGreen-700 dark:text-cream-300 md:text-2xl">
              {siteMetadata.description}
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-darkGreen-600 dark:text-cream-400">
              I love building and anything related to technology. I approach problems in a rational,
              pragmatic way and seek the simplest, most functional solutions possible.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="inline-flex items-center rounded-full bg-primary-500 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center rounded-full border-2 border-primary-500 px-6 py-3 text-base font-semibold text-primary-600 transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-950"
              >
                View Projects
              </Link>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm font-medium text-darkGreen-600 dark:text-cream-400">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <SocialIcon kind="github" href={siteMetadata.github} size={6} />
                <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
                <SocialIcon kind="x" href={siteMetadata.x} size={6} />
                <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-primary-500 dark:border-primary-400 lg:h-80 lg:w-80">
              <Image
                src={siteMetadata.authorInfo?.image || '/static/images/avatar.png'}
                alt={siteMetadata.author}
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-accentYellow-400 opacity-20 blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section className="mb-16 md:mb-24">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-darkGreen-900 dark:text-cream-100 md:text-4xl">
              Featured Projects
            </h2>
            <Link
              href="/projects"
              className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-lg border-2 border-brown-200 bg-cream-50 transition-all hover:border-primary-400 hover:shadow-lg dark:border-brown-700 dark:bg-darkGreen-900 dark:hover:border-primary-500"
              >
                {project.imgSrc && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.imgSrc}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-darkGreen-900 dark:text-cream-100">
                    {project.href ? (
                      <Link
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="mb-4 text-darkGreen-700 dark:text-cream-300">
                    {project.description}
                  </p>
                  {project.href && (
                    <Link
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
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
      <section className="mb-16 rounded-lg bg-brown-100 p-8 dark:bg-brown-900 md:mb-24 md:p-12">
        <h2 className="mb-6 text-3xl font-bold text-darkGreen-900 dark:text-cream-100 md:text-4xl">
          Technical Skills
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold text-darkGreen-800 dark:text-cream-200">
              Languages & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Java', 'React', 'Next.js', 'Django', 'JavaScript', 'Python'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-darkGreen-800 dark:text-cream-200">
              DevOps & Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Docker', 'Kubernetes', 'AWS', 'Azure', 'Dynatrace', 'Prometheus', 'Grafana'].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-lg font-semibold text-darkGreen-800 dark:text-cream-200">
              Other Skills
            </h3>
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
                  className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Latest Section */}
      <section className="divide-y divide-brown-200 dark:divide-brown-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-darkGreen-900 dark:text-cream-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Latest Posts
          </h2>
          <p className="text-lg leading-7 text-darkGreen-700 dark:text-cream-300">
            Thoughts, tutorials, and insights on software development and technology
          </p>
        </div>
        <ul className="divide-y divide-brown-200 dark:divide-brown-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-darkGreen-600 dark:text-cream-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-darkGreen-900 dark:text-cream-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-darkGreen-700 dark:text-cream-300">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read more: "${title}"`}
                        >
                          Read more &rarr;
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
          <div className="flex justify-end pt-8 text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="All posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
        <section className="mt-16 rounded-lg bg-primary-50 p-8 dark:bg-primary-950 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-darkGreen-900 dark:text-cream-100 md:text-3xl">
              Stay Updated
            </h2>
            <p className="mb-6 text-darkGreen-700 dark:text-cream-300">
              Get the latest posts and updates delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </section>
      )}
    </>
  )
}
