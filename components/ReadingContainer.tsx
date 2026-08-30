import { ReactNode } from 'react'

/**
 * The narrow column for reading routes (writing, videos, about, tags).
 * These pages are not part of the instrument-panel redesign — they inherit
 * the new tokens, header and footer only, and keep a comfortable measure
 * inside the wider chassis.
 */
export default function ReadingContainer({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-3xl px-5 sm:px-6 xl:max-w-5xl">{children}</div>
}
