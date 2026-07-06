import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import AmbientGlow from '@/components/AmbientGlow'
import NewsletterForm from 'pliny/ui/NewsletterForm'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <AmbientGlow className="bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2" />

      <div className="mt-16 border-t border-stone/15 pt-16">
        {/* Newsletter */}
        {siteMetadata.newsletter?.provider && (
          <div className="mb-16 flex flex-col items-center text-center">
            <p className="mb-3 font-mono text-xs text-stone">
              <span className="text-signal dark:text-signal-dark">$</span> subscribe
            </p>
            <h2 className="mb-2 font-display text-3xl font-semibold tracking-tight text-ink dark:text-bone sm:text-4xl">
              Stay in <span className="text-signal dark:text-signal-dark">the loop.</span>
            </h2>
            <p className="mb-8 max-w-sm text-sm text-stone">
              Devlogs, project updates, and notes from the lab. No spam — just what I'm shipping.
            </p>
            <div className="w-full max-w-md">
              <NewsletterForm />
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mb-10 border-t border-stone/15" />

        {/* Nav + socials + copyright */}
        <div className="mb-10 flex flex-col items-center gap-6">
          <nav className="flex flex-wrap justify-center gap-2">
            {['Blog', 'Projects', 'About'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="focus-ring rounded-full border border-stone/15 px-4 py-1.5 text-sm font-medium text-stone transition-all hover:border-stone/40 hover:text-ink dark:hover:text-bone"
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

          <p className="pb-8 text-xs text-stone/70">
            {siteMetadata.author} · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
