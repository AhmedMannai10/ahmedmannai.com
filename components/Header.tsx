import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { currentFocus } from '@/data/appsData'
import Link from './Link'
import Logo from './Logo'
import ShipLog from './ShipLog'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import { Dot } from './StatusDot'

const Header = () => (
  <header>
    <div className="flex items-stretch justify-between border-b border-panel-line dark:border-panel-dark-line">
      <Link
        href="/"
        aria-label={siteMetadata.headerTitle}
        className="focus-ring flex items-center px-5 md:px-10"
      >
        <Logo />
      </Link>

      <div className="flex items-stretch">
        <nav className="hidden items-stretch sm:flex">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="focus-ring flex min-h-[44px] items-center border-l border-panel-line px-5 font-mono text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors hover:text-signal dark:border-panel-dark-line dark:text-text-inverse-secondary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {currentFocus && (
          <div className="hidden items-center gap-2.5 border-l border-panel-line px-5 font-mono text-[10px] uppercase tracking-[0.16em] text-text-tertiary dark:border-panel-dark-line dark:text-text-inverse-tertiary lg:flex">
            <Dot status="building" />
            Shipping {currentFocus}
          </div>
        )}

        <div className="flex items-center border-l border-panel-line dark:border-panel-dark-line">
          <SearchButton />
        </div>
        <div className="flex items-center border-l border-panel-line dark:border-panel-dark-line">
          <ThemeSwitch />
        </div>
        <div className="flex items-center border-l border-panel-line pr-2 dark:border-panel-dark-line sm:hidden">
          <MobileNav />
        </div>
      </div>
    </div>

    <ShipLog />
  </header>
)

export default Header
