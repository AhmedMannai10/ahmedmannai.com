// New: replaces data/projectsData.ts for the apps section.
// Adds the fields the instrument-panel design needs: status, platform, serial, lastShip.
import { slug } from 'github-slugger'

export type AppStatus = 'live' | 'building' | 'paused'

export interface AppUnit {
  serial: string // "01" — the engraved unit number, stable, never reordered
  name: string
  tagline: string // one line, shown under the name
  description: string // 1–2 sentences max
  status: AppStatus
  platforms: string[] // rendered as "iOS · ANDROID"
  href?: string // omit while there is no public link
  linkLabel?: string // "sportzme.com" — shown instead of the raw href
  lastShip?: string // ISO date; feeds the hero LAST SHIP readout
  screenshots?: string[] // /static/images/...
  nextMilestone?: string // in-progress units only
  slug?: string
}

const appsRaw: Omit<AppUnit, 'slug'>[] = [
  {
    serial: '01',
    name: 'SportzMe',
    tagline: 'Find sport. Play now.',
    description: 'Open a pickup game, fill the roster, go play — the whole loop in under a minute.',
    status: 'live',
    platforms: ['iOS', 'Android'],
    href: 'https://www.sportzme.com/',
    linkLabel: 'sportzme.com',
    lastShip: '2026-04-02',
    screenshots: ['/static/images/sportzme.png'],
  },
  {
    serial: '02',
    name: 'TanTap',
    tagline: 'Every contact, with a next action.',
    description:
      'Import and sync your contacts, tag them, and keep the notes and the next action in one place.',
    status: 'live',
    platforms: ['Web', 'Mobile'],
    href: 'https://www.tantap.app/',
    linkLabel: 'tantap.app',
    lastShip: '2026-05-14',
    screenshots: ['/static/images/tantap.png'],
  },
  {
    serial: '03',
    name: 'SkillScan',
    tagline: 'The seconds that actually count.',
    description:
      'A measurement instrument for static calisthenics holds. Film a planche attempt; SkillScan reports the hold time and how many of those seconds met the FIG Code of Points standard, banded by tier.',
    status: 'building',
    platforms: ['Mobile'],
    lastShip: undefined,
    nextMilestone: 'TestFlight · 2026-07',
    screenshots: [
      '/static/images/skillscan/01-result-card.png',
      '/static/images/skillscan/02-file-trend-chart.png',
      '/static/images/skillscan/03-before-after.png',
      '/static/images/skillscan/04-declare-tier.png',
      '/static/images/skillscan/05-first-run-home.png',
      '/static/images/skillscan/06-paywall.png',
    ],
  },
]

const appsData: AppUnit[] = appsRaw.map((a) => ({ ...a, slug: slug(a.name) }))

export const liveCount = appsData.filter((a) => a.status === 'live').length
export const buildingCount = appsData.filter((a) => a.status === 'building').length
export const lastShip = appsData
  .map((a) => a.lastShip)
  .filter(Boolean)
  .sort()
  .reverse()[0]
export const currentFocus = appsData.find((a) => a.status === 'building')?.name

export default appsData
