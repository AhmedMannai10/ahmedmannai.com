'use client'

import { useRef, useState } from 'react'
import posthog from '../lib/posthog-browser'

type Status = 'idle' | 'sending' | 'done' | 'error'

/**
 * One field + one button sharing a single 1px border box — handoff 03 §9.
 * Posts to the existing /api/newsletter route (Loops).
 */
export default function NewsletterForm({
  label = 'Get the ship log',
  buttonLabel = 'Join',
  section = 'newsletter',
}: {
  label?: string
  buttonLabel?: string
  section?: string
}) {
  const inputEl = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const email = inputEl.current?.value
    if (!email || status === 'sending') return

    // The button answers the press straight away; the request can take a while.
    setStatus('sending')
    posthog.capture('newsletter_subscription_requested', { section })

    try {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const { error } = await res.json()

      if (error) {
        setStatus('error')
        setMessage('That address is invalid, or already subscribed.')
        return
      }

      if (inputEl.current) inputEl.current.value = ''
      setStatus('done')
    } catch {
      setStatus('error')
      setMessage('Something broke on my end. Try again in a minute.')
    }
  }

  const subscribed = status === 'done'

  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:text-text-inverse-tertiary">
        {label}
      </p>
      <form
        onSubmit={subscribe}
        className="flex border border-panel-line transition-colors duration-150 has-[input:focus]:border-signal dark:border-panel-dark-line dark:has-[input:focus]:border-signal"
      >
        <label htmlFor="newsletter-email" className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            ref={inputEl}
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={subscribed}
            placeholder={subscribed ? "You're on the list." : 'you@domain.com'}
            className="h-11 w-full border-0 bg-transparent px-3.5 font-sans text-base text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-0 dark:text-text-inverse dark:placeholder-text-inverse-tertiary md:text-[15px]"
          />
        </label>
        <button
          type="submit"
          disabled={subscribed || status === 'sending'}
          className="focus-ring press-solid h-11 shrink-0 border-l border-signal bg-signal px-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-panel-dark-base hover:bg-signal-hover disabled:cursor-default"
        >
          {subscribed ? 'Done' : status === 'sending' ? 'Sending' : buttonLabel}
        </button>
      </form>
      {status === 'error' && (
        <p
          role="alert"
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal"
        >
          {message}
        </p>
      )}
    </div>
  )
}
