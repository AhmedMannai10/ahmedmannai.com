import { NextRequest, NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'

async function handler(req: NextRequest) {
  const provider = siteMetadata.newsletter?.provider as string | undefined

  // Handle Loops.so integration
  if (provider === 'loops') {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }

    try {
      const body = await req.json()
      const email = body?.email

      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      const apiKey = process.env.LOOPS_API_KEY
      if (!apiKey) {
        return NextResponse.json({ error: 'Loops API key not configured' }, { status: 500 })
      }

      // Create contact in Loops.so
      const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subscribed: true,
          source: 'website',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // If contact already exists, that's okay - return success
        if (data.message?.includes('already exists') || response.status === 409) {
          return NextResponse.json({ message: 'Subscribed successfully' })
        }
        return NextResponse.json(
          { error: data.message || 'Failed to subscribe' },
          { status: response.status }
        )
      }

      return NextResponse.json({ message: 'Subscribed successfully' })
    } catch (error) {
      console.error('Loops.so subscription error:', error)
      return NextResponse.json({ error: 'Failed to process subscription' }, { status: 500 })
    }
  }

  // Fallback to pliny's NewsletterAPI for other providers
  const { NewsletterAPI } = await import('pliny/newsletter')
  const plinyHandler = NewsletterAPI({
    // @ts-ignore
    provider: provider,
  })

  const result = await plinyHandler(req)
  // Convert Response to NextResponse if needed
  if (result instanceof Response) {
    return result
  }
  return result
}

export { handler as GET, handler as POST }
