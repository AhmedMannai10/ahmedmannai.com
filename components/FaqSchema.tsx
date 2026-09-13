/**
 * Emits FAQPage structured data for a post that carries a real Q&A section.
 * Only use it when the questions and answers are genuinely visible on the page —
 * Google treats schema that isn't rendered as a violation, not a shortcut.
 *
 * Renders nothing itself; the visible Q&A stays authored in MDX.
 */
export default function FaqSchema({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
