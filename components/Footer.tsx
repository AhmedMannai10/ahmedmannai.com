import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

const SOCIALS = [
  { label: 'GitHub', href: siteMetadata.github },
  { label: 'X', href: siteMetadata.x },
  { label: 'YouTube', href: siteMetadata.youtube },
  { label: 'LinkedIn', href: siteMetadata.linkedin },
  { label: 'Instagram', href: siteMetadata.instagram },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="border-t border-panel-line dark:border-panel-dark-line">
      <div className="flex flex-col gap-4 px-5 py-4.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary dark:text-text-inverse-tertiary sm:flex-row sm:items-center sm:justify-between md:px-10">
        <span>
          {siteMetadata.author} · Ser. no. 01 · © {new Date().getFullYear()}
        </span>
        <nav className="flex flex-wrap gap-5.5">
          {SOCIALS.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              className="focus-ring inline-flex min-h-[44px] items-center transition-colors hover:text-signal sm:min-h-0"
            >
              {social.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
