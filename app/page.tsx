import { WizardShell } from '@/components/wizard/wizard-shell'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aligndev.dev'

const SITE_NAME = 'AlignDev'
const SITE_DESCRIPTION =
  'AlignDev is a frontend conventions generator built for the AI coding era. A 7-step visual wizard lets you pick your stack (Next.js, React, Vue, Nuxt, SvelteKit), UI library, state management, and Design Tokens, then outputs a full team standards document and a SKILL.md ready to be consumed by Claude Code, Cursor, GitHub Copilot, and other coding agents.'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    alternateName: 'AI Frontend Conventions Generator',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'Code Generator',
    operatingSystem: 'Any (Web)',
    inLanguage: 'en',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Visual wizard for choosing your stack (Next.js / React / Vue / Nuxt / SvelteKit)',
      'Live npm major version sync',
      'Generates a full Markdown team conventions document',
      'Generates a SKILL.md ready for Claude Code, Cursor, GitHub Copilot',
      '49 UI styles with Design Tokens presets',
      'WCAG contrast checks',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    description: SITE_DESCRIPTION,
  },
]

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WizardShell />
    </>
  )
}
