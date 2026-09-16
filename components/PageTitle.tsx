import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1
      className="font-display font-bold leading-[0.98] tracking-[-0.04em] text-text-primary dark:text-text-inverse"
      style={{ fontSize: 'clamp(2.125rem, 4.5vw, 3.25rem)' }}
    >
      {children}
    </h1>
  )
}
