import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aligndev.dev'

const SITE_NAME = 'AlignDev'
const SITE_TITLE =
  'AlignDev — AI Frontend Conventions Generator | Produce SKILL.md & Team Standards in Minutes'
const SITE_DESCRIPTION =
  'AlignDev is a frontend conventions generator built for the AI coding era. A 7-step visual wizard lets you pick your stack (Next.js, React, Vue, Nuxt, SvelteKit), UI library, state management, and Design Tokens, then outputs a full team standards document and a SKILL.md ready to be consumed by Claude Code, Cursor, GitHub Copilot, and other coding agents.'

const KEYWORDS = [
  'AlignDev',
  'AI frontend conventions',
  'AI coding standards',
  'frontend conventions generator',
  'SKILL.md generator',
  'Claude Code',
  'Claude Skill',
  'Cursor Rules',
  'GitHub Copilot rules',
  'AGENTS.md',
  'Next.js conventions',
  'React conventions',
  'Vue conventions',
  'Nuxt conventions',
  'SvelteKit conventions',
  'shadcn/ui',
  'Tailwind CSS',
  'Design Tokens',
  'TypeScript conventions',
  'AI developer tools',
  'frontend style guide',
  'AI agent rules',
]

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: '%s | AlignDev',
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: 'Next.js',
  keywords: KEYWORDS,
  authors: [{ name: 'AlignDev Team' }],
  creator: 'AlignDev',
  publisher: 'AlignDev',
  category: 'Developer Tools',
  classification: 'AI Development / Frontend Engineering / Code Standards',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'AlignDev — AI Frontend Conventions Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/align-icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon.ico',
    apple: '/align-icon.svg',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-hidden`}
    >
      <body>{children}</body>
    </html>
  )
}
