import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({ title, description, image, ...rest }: PageSEOProps): Metadata {
  const fullTitle = `${title} | ${siteMetadata.title}`
  const metaDescription = description || siteMetadata.description

  return {
    title,
    description: metaDescription,
    keywords: siteMetadata.keywords || [],
    authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: './',
      siteName: siteMetadata.title,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [
            {
              url: siteMetadata.socialBanner,
              width: 1200,
              height: 630,
              alt: siteMetadata.title,
            },
          ],
      locale: siteMetadata.locale || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: image ? [image] : [siteMetadata.socialBanner],
      creator: siteMetadata.x ? `@${siteMetadata.x.split('/').pop()}` : undefined,
    },
    ...rest,
  }
}
