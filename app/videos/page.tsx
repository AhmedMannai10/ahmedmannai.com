import Link from '@/components/Link'
import VideoCard from '@/components/VideoCard'
import AmbientGlow from '@/components/AmbientGlow'
import { Youtube } from '@/components/social-icons/icons'
import siteMetadata from '@/data/siteMetadata'
import { videosData } from '@/data/videosData'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Videos',
  description: 'Build-in-public videos from Ahmed Mannai.',
})

const sortedVideos = [...videosData].sort(
  (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
)

export default function Videos() {
  return (
    <div className="relative overflow-hidden">
      <AmbientGlow className="-top-20 left-1/2 h-[400px] w-[600px] -translate-x-1/2" />

      <div className="pb-12 pt-16">
        <p className="mb-3 font-mono text-xs text-stone">
          <span className="text-signal dark:text-signal-dark">$</span> videos --list
        </p>
        <h1
          className="font-display font-semibold leading-tight tracking-tight text-ink dark:text-bone"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Videos.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone">
          Build-in-public videos: shipping features, fixing production incidents, load-testing
          systems, and the actual work behind the posts on this site. Two up so far — more on the
          way. Subscribe and you won't miss one.
        </p>
      </div>

      <div className="border-t border-stone/15 pb-20 pt-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {sortedVideos.map((video) => (
            <VideoCard key={video.youtubeId} {...video} />
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-stone/15 bg-paper p-8 text-center dark:border-stone/20 dark:bg-graphite">
          <h2 className="mb-2 font-display text-xl font-semibold text-ink dark:text-bone sm:text-2xl">
            More on the way.
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-stone">
            Subscribe now — new videos land here and on YouTube at the same time.
          </p>
          <Link
            href={siteMetadata.youtube || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-signal px-6 py-2.5 text-sm font-semibold text-paper shadow-lg shadow-signal/20 transition-all duration-200 hover:scale-[1.02] hover:bg-signal/90 dark:bg-signal-dark dark:text-graphite"
          >
            <Youtube className="h-4 w-4 fill-current" />
            Subscribe on YouTube
          </Link>
        </div>
      </div>
    </div>
  )
}
