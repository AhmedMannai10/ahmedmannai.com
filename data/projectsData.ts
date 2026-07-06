import { slug } from 'github-slugger'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  slug?: string
}

const projectsDataRaw: Omit<Project, 'slug'>[] = [
  {
    title: 'SportzMe - Find Sport. Play Now.',
    description: `A mobile app connecting players worldwide through sports. Create games, discover nearby matches, and connect with players — all in one app. Features include game creation, location-based match discovery, player chat, and community feedback system.`,
    imgSrc: '/static/images/sportzme.png',
    href: 'https://www.sportzme.com/',
  },
  {
    title: 'TanTap - Business Relationship Management',
    description: `A Business Relationship Management tool designed for teams to enhance collaboration and visibility. Features include relationship tracking, activity logging, inbox management, and next-action suggestions to help teams stay organized and maintain strong business relationships.`,
    imgSrc: '/static/images/tantap.png',
    href: 'https://www.tantap.app/',
  },
]

// Generate slugs for all projects
const projectsData: Project[] = projectsDataRaw.map((project) => ({
  ...project,
  slug: slug(project.title),
}))

export default projectsData
