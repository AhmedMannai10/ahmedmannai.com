'use client'

import { useEffect } from 'react'
import posthog from '../lib/posthog-browser'

declare global {
  interface Window {
    Cal?: {
      (...args: unknown[]): void
      loaded?: boolean
      ns?: Record<string, unknown>
      q?: unknown[]
    }
  }
}

function initCalEmbedLoader() {
  ;(function (C: Window, A: string, L: string) {
    const p = (a: { q: unknown[] }, ar: unknown) => {
      a.q.push(ar)
    }
    const d = C.document
    C.Cal =
      C.Cal ||
      function (...ar: unknown[]) {
        const cal = C.Cal!
        if (!cal.loaded) {
          cal.ns = {}
          cal.q = cal.q || []
          d.head.appendChild(d.createElement('script')).src = A
          cal.loaded = true
        }
        if (ar[0] === L) {
          const api: { q: unknown[]; (...args: unknown[]): void } = function (...args: unknown[]) {
            p(api, args)
          }
          const namespace = ar[1] as string
          api.q = api.q || []
          if (typeof namespace === 'string') {
            cal.ns![namespace] = cal.ns![namespace] || api
            p(cal.ns![namespace] as { q: unknown[] }, ar)
            p(cal as unknown as { q: unknown[] }, ['initNamespace', namespace])
          } else {
            p(cal as unknown as { q: unknown[] }, ar)
          }
          return
        }
        p(cal as unknown as { q: unknown[] }, ar)
      }
  })(window, 'https://app.cal.com/embed/embed.js', 'init')
}

export default function CalEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    initCalEmbedLoader()
    const Cal = window.Cal!

    Cal('init')
    Cal('inline', {
      elementOrSelector: '#cal-inline-embed',
      calLink,
      config: { theme: 'auto' },
    })
    Cal('on', {
      action: 'bookingSuccessful',
      callback: () => {
        posthog.capture('call_booked')
      },
    })
  }, [calLink])

  return (
    <div
      id="cal-inline-embed"
      style={{ width: '100%', height: '800px', overflow: 'scroll' }}
      aria-label="Book a call with Ahmed Mannai"
    />
  )
}
