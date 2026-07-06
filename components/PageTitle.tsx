import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PageTitle({ children }: Props) {
  return (
    <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-ink dark:text-bone sm:text-4xl md:text-5xl">
      {children}
    </h1>
  )
}
