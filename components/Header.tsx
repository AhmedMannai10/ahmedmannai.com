import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl dark:border-gray-800/60 dark:bg-black/80">
      <div className="flex items-center justify-between py-4">
        <div>
          <Link href="/" aria-label={siteMetadata.headerTitle}>
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
                  className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                >
                  {link.title}
                </Link>
              ))}
          </nav>
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
