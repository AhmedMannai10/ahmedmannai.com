'use client'

import { useId, useRef, useState } from 'react'
import posthog from '../lib/posthog-browser'

type Status = 'idle' | 'sending' | 'done' | 'error'

/**
 * Email-gated download, in the instrument-panel idiom — hairline box, engraved
 * mono label, one signal-coloured control. Reuses the existing /api/newsletter
 * route (Loops), then swaps the form for the download link in place.
 *
 * The gate is soft on purpose: the file sits at a public path, so a reader who
 * would rather not hand over an address is never actually blocked. It filters
 * for intent, it does not enforce payment.
 */
export default function LeadMagnet({
  label = 'Get the PDF',
  title,
  blurb,
  bullets = [],
  fileUrl,
  fileMeta = 'PDF',
  buttonLabel = 'Send it',
  section = 'lead-magnet',
}: {
  label?: string
  title: string
  blurb?: string
  bullets?: string[]
  fileUrl: string
  fileMeta?: string
  buttonLabel?: string
  section?: string
}) {
  const inputEl = useRef<HTMLInputElement>(null)
  // Two of these render on the same post — the id has to be unique per instance
  // or the second label points at the first input.
  const fieldId = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const email = inputEl.current?.value
    if (!email || status === 'sending') return

    setStatus('sending')
    posthog.capture('lead_magnet_requested', { section, asset: fileUrl })

    try {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
      const { error } = await res.json()

      if (error) {
        setStatus('error')
        setMessage('That address looks wrong. Try again, or just take the file below.')
        posthog.capture('lead_magnet_failed', { section, asset: fileUrl })
        return
      }

      if (inputEl.current) inputEl.current.value = ''
      setStatus('done')
      posthog.capture('lead_magnet_delivered', { section, asset: fileUrl })
    } catch {
      setStatus('error')
      setMessage('Something broke on my end. The file is linked below either way.')
      posthog.capture('lead_magnet_failed', { section, asset: fileUrl })
    }
  }

  const delivered = status === 'done'

  return (
    <div className="my-10 border border-panel-line dark:border-panel-dark-line">
      <div className="flex items-center justify-between border-b border-panel-line px-4.5 py-2.5 dark:border-panel-dark-line">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:text-text-inverse-tertiary">
          {label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary dark:text-text-inverse-tertiary">
          {fileMeta}
        </span>
      </div>

      <div className="px-4.5 py-5">
        <p className="font-display text-[19px] font-medium leading-snug text-text-primary dark:text-text-inverse">
          {title}
        </p>

        {blurb && (
          <p className="mt-2 font-sans text-[15px] leading-relaxed text-text-secondary dark:text-text-inverse-secondary">
            {blurb}
          </p>
        )}

        {bullets.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 font-sans text-[15px] leading-relaxed text-text-secondary dark:text-text-inverse-secondary"
              >
                <span
                  aria-hidden="true"
                  className="mt-[9px] h-[7px] w-[7px] shrink-0 rounded-full bg-signal"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {!delivered ? (
          <form
            onSubmit={subscribe}
            className="mt-5 flex border border-panel-line dark:border-panel-dark-line"
          >
            <label htmlFor={fieldId} className="flex-1">
              <span className="sr-only">Email address</span>
              <input
                ref={inputEl}
                id={fieldId}
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@domain.com"
                className="h-11 w-full border-0 bg-transparent px-3.5 font-sans text-[15px] text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-0 dark:text-text-inverse dark:placeholder-text-inverse-tertiary"
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="focus-ring h-11 shrink-0 border-l border-signal bg-signal px-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-panel-dark-base transition-colors hover:bg-signal-hover disabled:cursor-default"
            >
              {status === 'sending' ? 'Sending' : buttonLabel}
            </button>
          </form>
        ) : (
          <a
            href={fileUrl}
            download
            className="focus-ring mt-5 flex h-11 items-center justify-center border border-signal bg-signal px-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-panel-dark-base transition-colors hover:bg-signal-hover"
          >
            Download the checklist
          </a>
        )}

        {status === 'error' && (
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
            {message}
          </p>
        )}

        <p className="mt-3 font-sans text-[13px] leading-relaxed text-text-tertiary dark:text-text-inverse-tertiary">
          {delivered ? (
            <>You&rsquo;re on the list — the file is above, and nothing else is gated.</>
          ) : (
            <>
              One email when I ship something. No sequence, no drip, unsubscribe in one click. Or
              skip the box —{' '}
              <a href={fileUrl} download className="underline underline-offset-2 hover:text-signal">
                the file is right here
              </a>
              .
            </>
          )}
        </p>
      </div>
    </div>
  )
}
