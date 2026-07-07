import { NextRequest, NextResponse } from 'next/server'
import siteMetadata from '@/data/siteMetadata'
import { PostHogClient } from '../../../lib/posthog-server'

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
      const posthog = PostHogClient()
      const distinctId = email ? `newsletter:${email}` : 'newsletter:anonymous'

      posthog.capture({
        distinctId,
        event: 'newsletter_subscription_requested',
        properties: {
          provider: 'loops',
          request_path: req.nextUrl.pathname,
        },
      })

      if (!email) {
        posthog.capture({
          distinctId,
          event: 'newsletter_subscription_failed',
          properties: {
            provider: 'loops',
            failure_stage: 'validation',
            reason: 'missing_email',
            request_path: req.nextUrl.pathname,
          },
        })
        await posthog.shutdown()
        return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      const apiKey = process.env.LOOPS_API_KEY
      if (!apiKey) {
        posthog.capture({
          distinctId,
          event: 'newsletter_subscription_failed',
          properties: {
            provider: 'loops',
            failure_stage: 'configuration',
            reason: 'missing_loops_api_key',
            request_path: req.nextUrl.pathname,
          },
        })
        await posthog.shutdown()
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
          posthog.capture({
            distinctId,
            event: 'newsletter_subscription_completed',
            properties: {
              provider: 'loops',
              result: 'already_subscribed',
              request_path: req.nextUrl.pathname,
            },
          })
          await posthog.shutdown()
          return NextResponse.json({ message: 'Subscribed successfully' })
        }
        posthog.capture({
          distinctId,
          event: 'newsletter_subscription_failed',
          properties: {
            provider: 'loops',
            failure_stage: 'provider_response',
            response_status: response.status,
            request_path: req.nextUrl.pathname,
          },
        })
        await posthog.shutdown()
        return NextResponse.json(
          { error: data.message || 'Failed to subscribe' },
          { status: response.status }
        )
      }

      posthog.capture({
        distinctId,
        event: 'newsletter_subscription_completed',
        properties: {
          provider: 'loops',
          result: 'subscribed',
          request_path: req.nextUrl.pathname,
        },
      })
      await posthog.shutdown()
      return NextResponse.json({ message: 'Subscribed successfully' })
    } catch (error) {
      const posthog = PostHogClient()
      posthog.capture({
        distinctId: 'newsletter:error',
        event: 'newsletter_subscription_failed',
        properties: {
          provider: 'loops',
          failure_stage: 'exception',
          request_path: req.nextUrl.pathname,
        },
      })
      posthog.captureException(error, 'newsletter:error')
      await posthog.shutdown()
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
