import Image from '@/components/Image'

/**
 * Dark-bezel screenshot frame. The bezel reads as a device screen in both
 * themes, so it stays #0E0F10 regardless of the active theme.
 * Screenshots are 1284x2778 (iPhone portrait) — the aspect ratio is fixed
 * so the frame never squashes them.
 */
export default function ScreenFrame({
  src,
  alt,
  className = '',
  ratio,
  wide = false,
  priority = false,
}: {
  src: string
  alt: string
  className?: string
  ratio?: string
  wide?: boolean
  priority?: boolean
}) {
  const aspect = ratio || 'aspect-[1284/2778]'
  return (
    <div
      className={`border border-panel-line bg-panel-dark-base p-1.5 dark:border-panel-dark-line ${className}`}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={wide ? '(max-width: 768px) 100vw, 1200px' : '(max-width: 768px) 50vw, 320px'}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  )
}
