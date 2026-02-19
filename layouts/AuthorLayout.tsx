import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

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
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* Page heading with gradient underline accent */}
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="relative inline-block text-3xl font-extrabold leading-9 tracking-tight text-black dark:text-white sm:text-4xl md:text-6xl">
          About Me
          <span
            aria-hidden="true"
            className="absolute -bottom-2 left-0 h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500"
          />
        </h1>
      </div>

      {/* Body: 2-col on xl, stacked on mobile */}
      <div className="items-start pt-8 xl:grid xl:grid-cols-3 xl:gap-x-10">
        {/* LEFT COLUMN — avatar, name, social */}
        <div className="flex flex-col items-center gap-4 pb-8 xl:sticky xl:top-8 xl:pb-0">
          {/* Avatar with gradient ring */}
          {avatar && (
            <div className="animate-fade-in rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 p-[3px]">
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
            <h3 className="text-2xl font-bold tracking-tight text-black dark:text-white">{name}</h3>
            {occupation && <p className="gradient-text mt-1 text-sm font-semibold">{occupation}</p>}
            {company && (
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">@ {company}</p>
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

        {/* RIGHT COLUMN — bio + skills */}
        <div className="xl:col-span-2">
          {/* MDX bio prose */}
          <div className="prose max-w-none pb-6 dark:prose-invert">{children}</div>

          {/* Skills section */}
          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Skills & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-700 dark:hover:bg-violet-950 dark:hover:text-violet-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
