import { allBlogs } from 'contentlayer/generated'

/**
 * Entry numbers for the writing index.
 *
 * A post's number is its ordinal by date with the oldest at 01, so publishing
 * appends to the archive and never renumbers it — the same rule the app serial
 * numbers follow in `data/appsData.ts`. Derived, never hardcoded.
 *
 * The list is built newest-first with the same comparator the pages use
 * (pliny's `sortPosts`), so two posts sharing a date fall in the same order
 * here as they do on the page and the numerals never read out of sequence.
 */
const ordered = [...allBlogs]
  .filter((post) => !post.draft)
  .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))

const serials = new Map<string, number>(
  ordered.map((post, i) => [post.slug, ordered.length - i] as [string, number])
)

/** How many entries are in the archive. */
export const totalEntries = serials.size

/** Zero-padded entry number for a post slug, e.g. `07`. */
export function entryNumber(slug: string): string {
  return String(serials.get(slug) ?? serials.size + 1).padStart(2, '0')
}

/** Zero-padded count, for engraved mono readouts. */
export function pad(n: number): string {
  return String(n).padStart(2, '0')
}
