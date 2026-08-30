'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import posthog from '../lib/posthog-browser'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      const nextStatus = !status
      document.body.style.overflow = status ? 'auto' : 'hidden'
      posthog.capture('mobile_nav_toggled', { nav_state: nextStatus ? 'opened' : 'closed' })
      return nextStatus
    })
  }

  return (
    <>
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="focus-ring flex h-11 w-11 items-center justify-center text-text-primary dark:text-text-inverse sm:hidden"
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <rect x="3" y="4" width="14" height="1.5" />
          <rect x="3" y="9.25" width="14" height="1.5" />
          <rect x="3" y="14.5" width="14" height="1.5" />
        </svg>
      </button>

      <Transition appear show={navShow} as={Fragment}>
        <Dialog as="div" className="relative z-50 sm:hidden" onClose={onToggleNav}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="fixed inset-0 flex flex-col bg-panel-base dark:bg-panel-dark-base">
              <div className="flex items-center justify-between border-b border-panel-line px-5 dark:border-panel-dark-line">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:text-text-inverse-tertiary">
                  Menu
                </span>
                <button
                  onClick={onToggleNav}
                  aria-label="Close menu"
                  className="focus-ring flex h-11 w-11 items-center justify-center text-text-primary dark:text-text-inverse"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.6 3.5 10 8.9l5.4-5.4 1.1 1.1L11.1 10l5.4 5.4-1.1 1.1L10 11.1l-5.4 5.4-1.1-1.1L8.9 10 3.5 4.6z" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    onClick={onToggleNav}
                    className="focus-ring flex min-h-[56px] items-center justify-between border-b border-panel-line px-5 font-mono text-lg uppercase tracking-[0.14em] text-text-primary transition-colors hover:text-signal dark:border-panel-dark-line dark:text-text-inverse"
                  >
                    {link.title}
                    <span aria-hidden="true" className="font-mono text-sm text-text-tertiary">
                      →
                    </span>
                  </Link>
                ))}
              </nav>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

export default MobileNav
