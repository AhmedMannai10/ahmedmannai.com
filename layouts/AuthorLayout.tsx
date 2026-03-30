import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

const SKILLS = [
  'Flutter',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Docker',
  'Linux',
  'DevOps',
  'PostgreSQL',
  'Git',
]

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <div className="relative overflow-hidden">
      {/* Atmospheric orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
          }}
        />
      </div>

      {/* Page heading */}
      <div className="pb-10 pt-16">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
          The person behind the work
        </p>
        <h1
          className="font-display font-bold leading-tight tracking-tight text-black dark:text-white"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          About{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Me.
          </span>
        </h1>
      </div>

      {/* Body: 2-col on xl, stacked on mobile */}
      <div className="border-t border-gray-100 dark:border-gray-900">
        <div className="items-start pt-10 xl:grid xl:grid-cols-3 xl:gap-x-12">
          {/* LEFT COLUMN — avatar, name, social */}
          <div className="flex flex-col items-center gap-5 pb-10 xl:sticky xl:top-24 xl:pb-0">
            {/* Avatar with gradient ring */}
            {avatar && (
              <div className="animate-fade-in rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 p-[3px] shadow-xl shadow-violet-500/20">
                <div className="rounded-full bg-white p-0.5 dark:bg-black">
                  <Image
                    src={avatar}
                    alt={name}
                    width={192}
                    height={192}
                    className="h-48 w-48 rounded-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Name + role */}
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
                {name}
              </h2>
              {occupation && (
                <p
                  className="mt-1 text-sm font-semibold"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {occupation}
                </p>
              )}
              {company && (
                <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">@ {company}</p>
              )}
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
          </div>

          {/* RIGHT COLUMN — bio + skills + CTA */}
          <div className="xl:col-span-2">
            {/* MDX bio prose */}
            <div className="prose max-w-none pb-6 dark:prose-invert">{children}</div>

            {/* Skills section */}
            <div className="border-t border-gray-100 pt-6 dark:border-gray-900">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-600 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-violet-700 dark:hover:bg-violet-950 dark:hover:text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Follow along CTA */}
            <div className="mt-10 border-t border-gray-100 pt-10 dark:border-gray-900">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                Follow the journey
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                I build in public and share what I learn. Follow along on X or browse the devlogs.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={siteMetadata.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-black bg-black px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-900 dark:border-white dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-gray-100"
                >
                  Follow on X
                </Link>
                <Link
                  href={siteMetadata.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white/60 px-5 py-2 text-sm font-semibold text-black backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-black/40 dark:text-white dark:hover:border-gray-500 dark:hover:bg-black/60"
                >
                  GitHub
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center rounded-full border border-gray-300 bg-white/60 px-5 py-2 text-sm font-semibold text-black backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] hover:border-gray-400 hover:bg-white dark:border-gray-700 dark:bg-black/40 dark:text-white dark:hover:border-gray-500 dark:hover:bg-black/60"
                >
                  Read the devlogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
