'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      {/* Hamburger trigger */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-black transition-all hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-900 sm:hidden"
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
              <Dialog.Panel className="relative overflow-hidden rounded-t-[2rem] bg-white/95 shadow-2xl backdrop-blur-2xl dark:bg-black/95">
                {/* Subtle atmospheric orb */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                  <div
                    className="absolute -top-16 left-1/2 h-64 w-80 -translate-x-1/2 rounded-full opacity-25 blur-[80px]"
                    style={{
                      background:
                        'radial-gradient(ellipse, rgba(139,92,246,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)',
                    }}
                  />
                </div>

                {/* Handle pill */}
                <div className="flex justify-center pt-3">
                  <div className="h-1 w-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Nav links */}
                <nav className="px-4 pb-2 pt-4">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      onClick={onToggleNav}
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 transition-colors hover:bg-gray-100/80 dark:hover:bg-gray-900/80"
                    >
                      <span className="text-2xl font-semibold tracking-tight text-black dark:text-white">
                        {link.title}
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-400 transition-colors group-hover:border-gray-300 group-hover:text-black dark:border-gray-800 dark:group-hover:border-gray-700 dark:group-hover:text-white">
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
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-gray-100/80 text-black transition-all hover:scale-[1.04] hover:bg-gray-200 active:scale-95 dark:border-gray-800 dark:bg-gray-900/80 dark:text-white dark:hover:bg-gray-800"
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
