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
  {
    title: 'Genetic Algorithm on a Robotic Controller',
    description: `Robotic Controller built with Genetic Algorithm, THE GOAL here was to implement
     genetic algorithm for soliving a real world problem like navigating a robot through a maze
      `,
    imgSrc: '/static/images/time-machine.jpg',
    href: 'https://github.com/AhmedMannai10/Robotic-Controller-With-Genetic-algorithm',
  },
  {
    title: 'Android Chat Room App ',
    description: `Using Java Sockets for a server hosted locally + managing multiple users, 
ChosChat is a simple Android app that allows users to enage in chat room converstions, reling on MySQl as a db
`,
    imgSrc: '/static/images/GhosChat.png',
    href: 'https://github.com/AhmedMannai10/GhosChat-Android-App',
  },
]

// Generate slugs for all projects
const projectsData: Project[] = projectsDataRaw.map((project) => ({
  ...project,
  slug: slug(project.title),
}))

export default projectsData
