import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-stone/15 bg-paper/80 backdrop-blur-xl dark:border-stone/20 dark:bg-graphite/80">
      <div className="flex items-center justify-between py-4">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle} className="focus-ring rounded">
            <div className="flex items-center">
              <Logo />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-1 sm:flex">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="focus-ring rounded-full px-4 py-1.5 text-sm font-medium text-stone transition-all hover:bg-stone/10 hover:text-ink dark:hover:text-bone"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
          <Link
            href="/book"
            className="focus-ring whitespace-nowrap rounded-full bg-signal px-4 py-1.5 text-sm font-semibold text-paper transition-all hover:scale-[1.02] hover:bg-signal/90 dark:bg-signal-dark dark:text-graphite dark:hover:bg-signal-dark/90"
          >
            Book a Call
          </Link>
          <div className="flex items-center gap-3">
            <SearchButton />
            <ThemeSwitch />
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
