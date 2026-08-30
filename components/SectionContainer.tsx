import { ReactNode } from 'react'

/**
 * The chassis. Instrument-panel routes run edge-to-edge inside this frame;
 * reading routes constrain their own column (see layouts/*).
 */
export default function SectionContainer({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1280px] border-panel-line dark:border-panel-dark-line lg:border-x">
      {children}
    </div>
  )
}
