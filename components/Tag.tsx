import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="focus-ring mr-2 inline-block rounded-full border border-stone/15 bg-stone/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-stone transition-all hover:border-signal hover:text-signal dark:hover:border-signal-dark dark:hover:text-signal-dark"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
