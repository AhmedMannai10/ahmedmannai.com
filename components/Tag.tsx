import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-2 inline-block rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600 transition-all hover:border-black hover:text-black dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-white dark:hover:text-white"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
