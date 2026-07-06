export interface Video {
  title: string
  youtubeId: string
  description: string
  publishedAt: string
}

export const videosData: Video[] = [
  {
    title: 'How to read and write through a serial port with Flutter',
    youtubeId: '4WiH9pf2ULQ',
    description:
      "A hands-on walkthrough of talking to hardware over a serial port from a Flutter app — reading and writing bytes, handling the platform-specific plumbing, and the gotchas that don't show up in the docs.",
    publishedAt: '2022-08-13',
  },
  {
    title: 'I built an app to fix pickup football | coding vlog',
    youtubeId: '05GOL_A7Me4',
    description:
      'A build-in-public look at SportzMe — why pickup football games are a scheduling nightmare, and the app I built to fix it. Real product decisions, real code, no polish.',
    publishedAt: '2026-05-17',
  },
]
