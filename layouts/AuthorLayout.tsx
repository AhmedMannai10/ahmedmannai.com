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
      {/* Page heading */}
      <div className="pb-10 pt-16">
        <p className="mb-3 font-mono text-xs text-stone">
          <span className="text-signal dark:text-signal-dark">$</span> whoami
        </p>
        <h1
          className="font-display font-semibold leading-tight tracking-tight text-ink dark:text-bone"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          About <span className="text-signal dark:text-signal-dark">Me.</span>
        </h1>
      </div>

      {/* Body: 2-col on xl, stacked on mobile */}
      <div className="border-t border-stone/15">
        <div className="items-start pt-10 xl:grid xl:grid-cols-3 xl:gap-x-12">
          {/* LEFT COLUMN — avatar, name, social */}
          <div className="flex flex-col items-center gap-5 pb-10 xl:sticky xl:top-24 xl:pb-0">
            {/* Avatar with gradient ring */}
            {avatar && (
              <div className="animate-fade-in rounded-full bg-signal p-[3px] shadow-xl shadow-signal/20 dark:bg-signal-dark">
                <div className="rounded-full bg-paper p-0.5 dark:bg-graphite">
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
              <h2 className="text-2xl font-bold tracking-tight text-ink dark:text-bone">{name}</h2>
              {occupation && (
                <p className="mt-1 font-mono text-sm font-semibold text-signal dark:text-signal-dark">
                  {occupation}
                </p>
              )}
              {company && <p className="mt-0.5 text-xs text-stone">@ {company}</p>}
            </div>

            {/* Social icons */}
            <div className="flex gap-3 pt-1">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="x" href={twitter} />
            </div>
          </div>

          {/* RIGHT COLUMN — bio + skills + CTA */}
          <div className="xl:col-span-2">
            {/* MDX bio prose */}
            <div className="prose max-w-none pb-6 dark:prose-invert">{children}</div>

            {/* Skills section */}
            <div className="border-t border-stone/15 pt-6">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-stone/15 bg-stone/5 px-3 py-1 font-mono text-xs font-medium text-stone transition-all hover:border-signal/40 hover:bg-signal/5 hover:text-signal dark:hover:border-signal-dark/40 dark:hover:bg-signal-dark/10 dark:hover:text-signal-dark"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Book a Call CTA */}
            <div className="mt-10 border-t border-stone/15 pt-10">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone">
                Let's talk
              </p>
              <p className="mt-2 text-base text-stone">
                Building a product from scratch, or fighting a system that falls over under load?
                Book 30 minutes and let's talk about it.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="focus-ring inline-flex items-center rounded-full bg-signal px-5 py-2 text-sm font-semibold text-paper shadow-lg shadow-signal/20 transition-all duration-200 hover:scale-[1.02] hover:bg-signal/90 dark:bg-signal-dark dark:text-graphite"
                >
                  Book a Call
                </Link>
                <Link
                  href={siteMetadata.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center rounded-full border border-stone/20 bg-paper px-5 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:scale-[1.02] hover:border-stone/40 dark:border-stone/20 dark:bg-graphite dark:text-bone dark:hover:border-stone/40"
                >
                  Follow on X
                </Link>
                <Link
                  href="/blog"
                  className="focus-ring inline-flex items-center rounded-full border border-stone/20 bg-paper px-5 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:scale-[1.02] hover:border-stone/40 dark:border-stone/20 dark:bg-graphite dark:text-bone dark:hover:border-stone/40"
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
