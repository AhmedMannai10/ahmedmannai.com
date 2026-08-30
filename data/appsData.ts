import { slug } from 'github-slugger'

export type AppStatus = 'live' | 'building' | 'paused'

export interface SpecRow {
  label: string
  value: string
  signal?: boolean
}

export interface Milestone {
  name: string
  state: 'done' | 'now' | 'todo'
  when?: string
}

export interface Screenshot {
  src: string
  caption: string
  /** Tailwind aspect class. Defaults to the portrait phone frame. */
  ratio?: string
  /** Landscape captures fill the column instead of sitting in a phone-width frame. */
  wide?: boolean
}

export interface AppUnit {
  serial: string // the engraved unit number — stable, never reordered
  name: string
  tagline: string // one line, shown under the name
  role?: string // mono one-liner on the detail page
  description: string // 1-2 sentences, used on the index and homepage
  detail?: string[] // detail-page paragraphs; falls back to `description`
  status: AppStatus
  platforms: string[] // rendered as "iOS · ANDROID"
  href?: string // omitted while there is no public link
  linkLabel?: string // "sportzme.com" — shown instead of the raw href
  lastShip?: string // ISO date; feeds the hero LAST SHIP readout
  nextMilestone?: string // in-progress units only
  buildProgress?: number // 0-100, in-progress units only
  spec?: SpecRow[]
  milestones?: Milestone[]
  screenshots?: Screenshot[]
  slug?: string
}

const appsRaw: Omit<AppUnit, 'slug'>[] = [
  {
    serial: '01',
    name: 'SportzMe',
    tagline: 'Find sport. Play now.',
    role: 'A PICKUP GAME ORGANISER FOR LOCAL SPORT',
    description: 'Open a pickup game, fill the roster, go play — the whole loop in under a minute.',
    detail: [
      'Open a pickup game, fill the roster, go play. SportzMe collapses the group-chat negotiation that normally stands between a free evening and an actual match into a single flow: post a game, let nearby players claim a spot, and show up.',
      'Live on iOS and Android. Games are discovered by location, rosters settle themselves, and the chat stays attached to the match rather than sprawling across three apps.',
    ],
    status: 'live',
    platforms: ['iOS', 'Android'],
    href: 'https://www.sportzme.com/',
    linkLabel: 'sportzme.com',
    lastShip: '2026-04-02',
    spec: [
      { label: 'SER. NO.', value: '01' },
      { label: 'STATUS', value: 'LIVE' },
      { label: 'PLATFORM', value: 'iOS · ANDROID' },
      { label: 'DISCOVERY', value: 'LOCATION · RADIUS' },
      { label: 'ROSTER', value: 'CLAIM · WAITLIST' },
      { label: 'CHAT', value: 'PER MATCH' },
      { label: 'LAST SHIP', value: '2026-04-02' },
    ],
    screenshots: [
      {
        src: '/static/images/sportzme.png',
        caption: '01 · LANDING PAGE',
        ratio: 'aspect-[2032/950]',
        wide: true,
      },
    ],
  },
  {
    serial: '02',
    name: 'TanTap',
    tagline: 'Every contact, with a next action.',
    role: 'A CONTACT INSTRUMENT FOR PEOPLE WHO MEET PEOPLE',
    description:
      'Import and sync your contacts, tag them, and keep the notes and the next action in one place.',
    detail: [
      'Import and sync contacts from your phone and your cloud providers, tag them, and keep the notes and the next action attached to the person rather than scattered across a notebook and an inbox.',
      'Built for the case where you meet more people in a week than you can hold in your head. Live on web and mobile, with an offline-first sync engine underneath.',
    ],
    status: 'live',
    platforms: ['Web', 'Mobile'],
    href: 'https://www.tantap.app/',
    linkLabel: 'tantap.app',
    lastShip: '2026-05-14',
    spec: [
      { label: 'SER. NO.', value: '02' },
      { label: 'STATUS', value: 'LIVE' },
      { label: 'PLATFORM', value: 'WEB · MOBILE' },
      { label: 'IMPORT', value: 'DEVICE · GOOGLE' },
      { label: 'SYNC', value: 'OFFLINE FIRST' },
      { label: 'ORGANISE', value: 'TAGS · NOTES · NEXT ACTION' },
      { label: 'LAST SHIP', value: '2026-05-14' },
    ],
    screenshots: [{ src: '/static/images/tantap.png', caption: '01 · RECENT ACTIVITY' }],
  },
  {
    serial: '03',
    name: 'SkillScan',
    tagline: 'The seconds that actually count.',
    role: 'A MEASUREMENT INSTRUMENT FOR STATIC HOLDS',
    description:
      'A measurement instrument for static calisthenics holds. Film a planche attempt; SkillScan reports the hold time and how many of those seconds met the standard.',
    detail: [
      'Film a planche attempt and SkillScan reports two numbers: how long you held it, and how many of those seconds actually met the FIG Code of Points standard for the tier you declared. Everything runs on device against 60 fps video.',
      "No public link yet. It's on the bench, and the build is happening in the open.",
    ],
    status: 'building',
    platforms: ['Mobile'],
    nextMilestone: 'TestFlight · 2026-09',
    buildProgress: 64,
    spec: [
      { label: 'SER. NO.', value: '03' },
      { label: 'STATUS', value: 'BUILDING', signal: true },
      { label: 'PLATFORM', value: 'iOS · ANDROID' },
      { label: 'MEASURES', value: 'HOLD TIME · CLEAN TIME' },
      { label: 'STANDARD', value: 'FIG ART. 9.3' },
      { label: 'TIERS', value: 'TUCK · ADV · STRADDLE · FULL' },
      { label: 'INPUT', value: '60 FPS VIDEO · ON DEVICE' },
      { label: 'STARTED', value: '2025-11' },
      { label: 'NEXT MILESTONE', value: 'TESTFLIGHT · 2026-09', signal: true },
    ],
    milestones: [
      { name: 'POSE TRACKER', state: 'done', when: '2026-03' },
      { name: 'TIER DECLARATION', state: 'done', when: '2026-05' },
      { name: 'CLEAN-TIME SCORING', state: 'now' },
      { name: 'TESTFLIGHT BETA', state: 'todo', when: '2026-09' },
      { name: 'PUBLIC RELEASE', state: 'todo', when: 'TBD' },
    ],
    screenshots: [
      { src: '/static/images/skillscan/01-result-card.png', caption: '01 · RESULT CARD' },
      { src: '/static/images/skillscan/02-file-trend-chart.png', caption: '02 · TREND OVER TIME' },
      { src: '/static/images/skillscan/03-before-after.png', caption: '03 · BEFORE / AFTER' },
      { src: '/static/images/skillscan/04-declare-tier.png', caption: '04 · DECLARE TIER' },
      { src: '/static/images/skillscan/05-first-run-home.png', caption: '05 · FIRST RUN' },
      { src: '/static/images/skillscan/06-paywall.png', caption: '06 · UPGRADE' },
    ],
  },
]

const appsData: AppUnit[] = appsRaw.map((a) => ({ ...a, slug: slug(a.name) }))

export const liveCount = appsData.filter((a) => a.status === 'live').length
export const buildingCount = appsData.filter((a) => a.status === 'building').length
export const pausedCount = appsData.filter((a) => a.status === 'paused').length
export const lastShip = appsData
  .map((a) => a.lastShip)
  .filter(Boolean)
  .sort()
  .reverse()[0]
export const currentFocus = appsData.find((a) => a.status === 'building')?.name

export default appsData
