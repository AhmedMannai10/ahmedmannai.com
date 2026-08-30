// New: feeds components/ShipLog.tsx — the signature strip on every page.
// Newest first. Keep it short; the strip shows 3 on desktop, 2 on mobile.
export interface ShipLogEntry {
  date: string // ISO
  text: string // rendered UPPERCASE by the strip — write it normally here
}

const shipLog: ShipLogEntry[] = [
  { date: '2026-05-14', text: 'TanTap 2.3 sync engine' },
  { date: '2026-04-02', text: 'SportzMe Android release' },
  { date: '2026-03-11', text: 'SkillScan pose tracker' },
]

export const buildNumber = '0412' // shown in the strip's right cell

export default shipLog
