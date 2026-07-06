export interface CaseStudy {
  title: string
  context: string
  description: string
  metrics: string[]
  stack: string[]
  trend: number[]
  trendColor: 'signal' | 'alert'
  trendLabels: [string, string]
}

const caseStudiesData: CaseStudy[] = [
  {
    title: 'Black Friday Readiness for a Major Swiss Retailer',
    context:
      "A national retail chain's e-commerce platform, ahead of its highest-traffic weekend of the year.",
    description:
      "Designed and ran full-scale load testing against the checkout and catalog paths to find the platform's actual breaking point before customers did, then worked with the platform team to close the gaps and tune the highest-traffic flows.",
    metrics: [
      '58% increase in concurrent users (1,200 → 1,900)',
      '+7% improvement in conversion rate',
    ],
    stack: ['JMeter', 'NeoLoad', 'Prometheus', 'Grafana'],
    trend: [30, 28, 34, 26, 40, 55, 70, 88, 95],
    trendColor: 'signal',
    trendLabels: ['1,200 users', '1,900 users'],
  },
  {
    title: 'Stabilizing a Consumer Mobile App at Scale',
    context:
      'A consumer-facing mobile app with a growing user base and a rising crash rate eating into retention.',
    description:
      "Instrumented the app's crash and performance telemetry, traced failures back to root cause across the mobile client and backend, and shipped fixes that cut the crash rate by more than half.",
    metrics: ['53% reduction in crash rate (1.7% → 0.8%)'],
    stack: ['Mobile crash reporting', 'Backend tracing'],
    trend: [85, 80, 88, 75, 70, 55, 40, 30, 20, 15],
    trendColor: 'alert',
    trendLabels: ['1.7% crash rate', '0.8% crash rate'],
  },
  {
    title: 'Observability Pipeline for a Distributed Platform',
    context:
      'A platform team flying blind across services, with no unified way to see what broke or why.',
    description:
      'Built a full observability stack — metrics, traces, and logs in one place — so the team could diagnose incidents in minutes instead of hours, and catch regressions before customers noticed.',
    metrics: ['Full-stack visibility: metrics, traces, and logs unified'],
    stack: ['Prometheus', 'Grafana', 'Tempo', 'Loki'],
    trend: [50, 72, 22, 80, 18, 65, 50, 50, 50, 50],
    trendColor: 'signal',
    trendLabels: ['Blind spots', 'Full visibility'],
  },
]

export default caseStudiesData
