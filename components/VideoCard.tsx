'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatDate } from 'pliny/utils/formatDate'
import posthog from '../lib/posthog-browser'
import siteMetadata from '@/data/siteMetadata'
import type { Video } from '@/data/videosData'

export default function VideoCard({ title, youtubeId, description, publishedAt }: Video) {
  const [playing, setPlaying] = useState(false)

  return (
    <article className="overflow-hidden rounded-xl border border-stone/15 bg-paper transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-stone/20 dark:bg-graphite">
      <div className="relative aspect-video w-full bg-graphite">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
            title={title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              posthog.capture('video_started', {
                video_id: youtubeId,
                video_title: title,
                published_at: publishedAt,
              })
              setPlaying(true)
            }}
            aria-label={`Play video: ${title}`}
            className="focus-ring group relative block h-full w-full"
          >
            <Image
              src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal/90 shadow-lg transition-transform group-hover:scale-110 dark:bg-signal-dark/90">
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-paper dark:fill-graphite">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
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
    </article>
  )
}
