import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'
import { Analytics } from '@vercel/analytics/react'

import { IBM_Plex_Sans, IBM_Plex_Serif, IBM_Plex_Mono } from 'next/font/google'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import PostHogInit from '@/components/PostHogInit'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans',
})

const plexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-serif',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-plex-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords || [],
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  publisher: siteMetadata.author,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    locale: siteMetadata.locale || 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
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
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    creator: siteMetadata.x ? `@${siteMetadata.x.split('/').pop()}` : undefined,
  },
  verification: {
    // Add verification codes here when you have them
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
    // other: {
    //   'facebook-domain-verification': 'your-facebook-verification-code',
    // },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${plexSans.variable} ${plexSerif.variable} ${plexMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <link rel="icon" type="image/svg+xml" href={`${basePath}/static/favicons/favicon.svg`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#0E6B57"
      />
      <meta name="msapplication-TileColor" content="#0F1113" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F5F6F2" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0F1113" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: siteMetadata.authorInfo?.name || siteMetadata.author,
            jobTitle: siteMetadata.authorInfo?.jobTitle || 'Software Engineer',
            description: siteMetadata.description,
            worksFor: {
              '@type': 'Organization',
              name: siteMetadata.authorInfo?.company || '1MoreThing Ventures',
            },
            email: siteMetadata.authorInfo?.email || siteMetadata.email,
            image: siteMetadata.authorInfo?.image || siteMetadata.siteLogo,
            url: siteMetadata.siteUrl,
            knowsAbout: [
              'Software Engineering',
              'DevOps',
              'Web Development',
              'Mobile Development',
              'TypeScript',
              'React',
              'Next.js',
            ],
            sameAs:
              siteMetadata.authorInfo?.sameAs ||
              [
                siteMetadata.github,
                siteMetadata.x,
                siteMetadata.linkedin,
                siteMetadata.youtube,
              ].filter(Boolean),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: siteMetadata.title,
            description: siteMetadata.description,
            url: siteMetadata.siteUrl,
            inLanguage: 'en-US',
            author: {
              '@type': 'Person',
              name: siteMetadata.author,
            },
            publisher: {
              '@type': 'Person',
              name: siteMetadata.author,
            },
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteMetadata.siteUrl}/search?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
      <body className="bg-paper pl-[calc(100vw-100%)] text-ink antialiased dark:bg-graphite dark:text-bone">
        <PostHogInit />
        <Analytics />
        <SpeedInsights />
        <ThemeProviders>
          <SectionContainer>
            <div className="flex h-screen flex-col justify-between font-sans">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="mb-auto">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
