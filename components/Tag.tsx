import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="mr-3 rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium uppercase text-black transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
