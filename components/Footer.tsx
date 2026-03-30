import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import NewsletterForm from 'pliny/ui/NewsletterForm'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Atmospheric orb */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
          }}
        />
      </div>

      <div className="mt-16 border-t border-gray-200 pt-16 dark:border-gray-800">
        {/* Newsletter */}
        {siteMetadata.newsletter?.provider && (
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-500">
              Newsletter
            </p>
            <h2 className="mb-2 font-display text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">
              Stay in{' '}
              <span
                style={{
                  backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                the loop.
              </span>
            </h2>
            <p className="mb-8 max-w-sm text-sm text-gray-500 dark:text-gray-400">
              Devlogs, project updates, and notes from the lab. No spam — just what I'm shipping.
            </p>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mb-10 border-t border-gray-100 dark:border-gray-900" />

        {/* Nav + socials + copyright */}
        <div className="mb-10 flex flex-col items-center gap-6">
          <nav className="flex flex-wrap justify-center gap-2">
            {['Blog', 'Projects', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="rounded-full border border-gray-200 px-4 py-1.5 text-sm font-medium text-gray-500 transition-all hover:border-gray-400 hover:text-black dark:border-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-white"
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex gap-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
            <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
            <SocialIcon kind="x" href={siteMetadata.x} size={5} />
            <SocialIcon kind="instagram" href={siteMetadata.instagram} size={5} />
          </div>

          <p className="pb-8 text-xs text-gray-400 dark:text-gray-600">
            {siteMetadata.author} · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
