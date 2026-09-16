'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }
  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button
          onClick={() => setLoadComments(true)}
          className="focus-ring inline-flex min-h-[44px] items-center border border-text-primary px-5.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-text-primary transition-colors hover:border-signal hover:text-signal dark:border-text-inverse dark:text-text-inverse dark:hover:border-signal dark:hover:text-signal"
        >
          Load comments
        </button>
      )}
    </>
  )
}
