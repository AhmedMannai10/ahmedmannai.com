import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import projectsData from '@/data/projectsData'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Blog post routes - ensure URLs are correct (blog/{slug})
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  // Project routes - individual project pages
  const projectRoutes = projectsData.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Tag routes
  const tagData = JSON.parse(
    readFileSync(join(process.cwd(), 'app', 'tag-data.json'), 'utf-8')
  ) as Record<string, number>
  const tagRoutes = Object.keys(tagData).map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // Main routes
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

  return [...routes, ...blogRoutes, ...projectRoutes, ...tagRoutes]
}
