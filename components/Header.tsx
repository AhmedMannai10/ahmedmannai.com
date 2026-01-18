import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Logo from './Logo'

const Header = () => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-4 dark:border-gray-800">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center">
            <Logo />
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden items-center gap-6 sm:flex">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-4">
          <SearchButton />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
