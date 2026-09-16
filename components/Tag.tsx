import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

/**
 * Square hairline chip — engraved mono label, orange on hover. Spacing is the
 * caller's job: put these in a `flex flex-wrap gap-2`, never rely on margins.
 */
const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="focus-ring inline-flex min-h-[44px] items-center border border-panel-line px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-text-tertiary transition-colors hover:border-signal hover:text-signal dark:border-panel-dark-line dark:text-text-inverse-tertiary md:min-h-[30px]"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
