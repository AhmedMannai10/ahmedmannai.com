import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  const routes = [
    { route: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { route: 'about', priority: 0.9, changeFrequency: 'monthly' as const },
    { route: 'blog', priority: 0.9, changeFrequency: 'weekly' as const },
    { route: 'projects', priority: 0.8, changeFrequency: 'monthly' as const },
    { route: 'tags', priority: 0.7, changeFrequency: 'weekly' as const },
  ].map(({ route, priority, changeFrequency }) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency,
    priority,
  }))

  return [...routes, ...blogRoutes]
}
