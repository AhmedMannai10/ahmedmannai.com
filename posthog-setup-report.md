<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of this Next.js App Router marketing site. PostHog browser initialization was added through `instrumentation-client.ts`, an EU reverse proxy was configured in `next.config.js`, and a server-side PostHog helper was added for API route instrumentation. Client-side capture was added for homepage CTA interactions, featured post clicks, outbound social clicks, search opens, video starts, and mobile navigation toggles. Server-side capture and exception tracking were added to the newsletter route for request, success, and failure outcomes. Environment variables were written to `.env.local`, and the production build was verified successfully.

| Event name                          | Description                                                                                  | File                          |
| ----------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------- |
| `cta_clicked`                       | Captures clicks on prominent call-to-action links across the homepage and mobile navigation. | `app/Main.tsx`                |
| `featured_post_clicked`             | Captures clicks on featured blog post cards from the homepage writing section.               | `app/Main.tsx`                |
| `social_link_clicked`               | Captures clicks on outbound social links from the homepage follow section.                   | `app/Main.tsx`                |
| `search_opened`                     | Captures when visitors open the site search control.                                         | `components/SearchButton.tsx` |
| `video_started`                     | Captures when a visitor starts playing an embedded video.                                    | `components/VideoCard.tsx`    |
| `mobile_nav_toggled`                | Captures when the mobile navigation menu is opened or closed.                                | `components/MobileNav.tsx`    |
| `newsletter_subscription_requested` | Captures server-side newsletter subscription attempts handled by the API route.              | `app/api/newsletter/route.ts` |
| `newsletter_subscription_completed` | Captures successful server-side newsletter subscriptions.                                    | `app/api/newsletter/route.ts` |
| `newsletter_subscription_failed`    | Captures failed server-side newsletter subscriptions and integration errors.                 | `app/api/newsletter/route.ts` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- Dashboard: https://eu.posthog.com/project/217676/dashboard/798596
- Insight: CTA clicks over time (wizard) — https://eu.posthog.com/project/217676/insights/mWzqUn4g
- Insight: Newsletter outcomes (wizard) — https://eu.posthog.com/project/217676/insights/ZopadYjy
- Insight: Featured content engagement (wizard) — https://eu.posthog.com/project/217676/insights/efP1J1b0
- Insight: Newsletter conversion funnel (wizard) — https://eu.posthog.com/project/217676/insights/g2sqyZyl
- Insight: Navigation and social engagement (wizard) — https://eu.posthog.com/project/217676/insights/LLPUgcoe

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add the exact PostHog env var names you added to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
