'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import posthog from '../lib/posthog-browser'
import Link from './Link'
import AmbientGlow from './AmbientGlow'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      const nextStatus = !status

      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }

      posthog.capture('mobile_nav_toggled', {
        nav_state: nextStatus ? 'opened' : 'closed',
      })

      return nextStatus
    })
  }

  return (
    <>
      {/* Hamburger trigger */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-full border border-stone/15 text-ink transition-all hover:border-stone/30 hover:bg-stone/5 dark:border-stone/20 dark:text-bone dark:hover:border-stone/40 dark:hover:bg-stone/10 sm:hidden"
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog as="div" className="relative z-50 sm:hidden" onClose={onToggleNav}>
          {/* Blurred backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-250"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-md" />
          </Transition.Child>

          {/* Bottom sheet */}
          <div className="fixed inset-x-0 bottom-0">
            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-350"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition ease-in duration-250"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="relative overflow-hidden rounded-t-[2rem] bg-paper/95 shadow-2xl backdrop-blur-2xl dark:bg-graphite/95">
                <AmbientGlow className="-top-16 left-1/2 h-64 w-80 -translate-x-1/2" />

                {/* Handle pill */}
                <div className="flex justify-center pt-3">
                  <div className="h-1 w-10 rounded-full bg-stone/30" />
                </div>

                {/* Nav links */}
                <nav className="px-4 pb-2 pt-4">
                  <Link
                    href="/book"
                    onClick={onToggleNav}
                    className="focus-ring mb-2 flex items-center justify-center rounded-2xl bg-signal px-4 py-4 text-lg font-semibold text-paper transition-colors dark:bg-signal-dark dark:text-graphite"
                  >
                    Book a Call
                  </Link>
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={onToggleNav}
                      className="focus-ring group flex items-center justify-between rounded-2xl px-4 py-4 transition-colors hover:bg-stone/10"
                    >
                      <span className="text-2xl font-semibold tracking-tight text-ink dark:text-bone">
                        {link.title}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-stone/15 text-sm text-stone transition-colors group-hover:border-stone/30 group-hover:text-ink dark:border-stone/20 dark:group-hover:border-stone/40 dark:group-hover:text-bone">
                        →
                      </span>
                    </Link>
                  ))}
                </nav>

                {/* Close button */}
                <div className="flex justify-center px-4 pb-10 pt-4">
                  <button
                    onClick={onToggleNav}
                    aria-label="Close menu"
                    className="focus-ring flex h-12 w-12 items-center justify-center rounded-full border border-stone/15 bg-stone/10 text-ink transition-all hover:scale-[1.04] hover:bg-stone/20 active:scale-95 dark:border-stone/20 dark:text-bone"
                  >
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
