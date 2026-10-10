'use client'

import Image from 'next/image'
import { formatDate } from 'pliny/utils/formatDate'
import posthog from '../lib/posthog-browser'
import siteMetadata from '@/data/siteMetadata'
import type { Video } from '@/data/videosData'

export default function VideoCard({ title, youtubeId, description, publishedAt }: Video) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone/15 bg-paper transition-colors duration-150 hover:border-stone/40 dark:border-stone/20 dark:bg-graphite dark:hover:border-stone/40">
      <a
        href={`https://www.youtube.com/watch?v=${youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          posthog.capture('video_opened', {
            video_id: youtubeId,
            video_title: title,
            published_at: publishedAt,
          })
        }}
        aria-label={`Watch on YouTube: ${title}`}
        className="focus-ring press group block"
      >
        <div className="relative aspect-video w-full bg-graphite">
          <Image
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-150 group-hover:bg-black/30 group-active:bg-black/40 group-active:duration-0">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal transition-colors duration-150 group-hover:bg-signal-hover group-active:bg-signal-press group-active:duration-0">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-paper dark:fill-graphite">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>
        <div className="p-5">
          <time
            dateTime={publishedAt}
            className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-stone"
            suppressHydrationWarning
          >
            {formatDate(publishedAt, siteMetadata.locale)}
          </time>
          <h2 className="mb-2 text-lg font-bold tracking-tight text-ink dark:text-bone">{title}</h2>
          <p className="text-sm leading-relaxed text-stone">{description}</p>
        </div>
      </a>
    </article>
  )
}
