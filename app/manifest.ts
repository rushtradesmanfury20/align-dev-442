import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AlignDev — AI Frontend Conventions Generator',
    short_name: 'AlignDev',
    description:
      'A 7-step visual wizard that produces a full frontend conventions document and a SKILL.md ready for AI coding agents.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0a0a0a',
    lang: 'en',
    dir: 'ltr',
    orientation: 'portrait',
    categories: ['developer', 'productivity', 'utilities'],
    icons: [
      {
        src: '/align-icon.svg',
        sizes: '64x64',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}
