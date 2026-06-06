'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { Badge } from '@/components/ui/badge'
import { STEP_LABELS } from '@/types/wizard'

const STEP_FIELDS = [
  {
    label: STEP_LABELS[0],
    fields: ['framework', 'language', 'pkgMgr', 'buildTool', 'i18n', 'textDirection'],
  },
  {
    label: STEP_LABELS[1],
    fields: ['componentLib', 'cssSolution', 'iconLib'],
  },
  {
    label: STEP_LABELS[2],
    fields: ['globalState', 'serverState'],
  },
  {
    label: STEP_LABELS[3],
    fields: ['linter', 'formatter', 'preCommit', 'testing', 'cicd'],
  },
  {
    label: STEP_LABELS[4],
    fields: ['dirPattern', 'dirDepth'],
  },
  {
    label: STEP_LABELS[5],
    fields: ['fileNaming', 'importOrder', 'maxFileLines'],
  },
  {
    label: STEP_LABELS[6],
    fields: ['themeStyle', 'colorDepth', 'spacingBase', 'tokenConvention'],
  },
]

const DISPLAY_MAP: Record<string, string> = {
  nextjs: 'Next.js', 'react-spa': 'React', vue: 'Vue', nuxt: 'Nuxt', svelte: 'Svelte',
  typescript: 'TypeScript', javascript: 'JavaScript',
  npm: 'npm', yarn: 'Yarn', pnpm: 'pnpm', bun: 'Bun',
  vite: 'Vite', rollup: 'Rollup', webpack: 'Webpack',
  'next-intl': 'next-intl', i18next: 'i18next', 'vue-i18n': 'Vue I18n', 'nuxt-i18n': '@nuxtjs/i18n',
  ltr: 'LTR', rtl: 'RTL', bidi: 'LTR+RTL',
  antd: 'Ant Design', shadcn: 'shadcn/ui', mui: 'MUI', radix: 'Radix UI', chakra: 'Chakra UI',
  'element-plus': 'Element Plus', 'ant-design-vue': 'Ant Design Vue', 'naive-ui': 'Naive UI', daisyui: 'daisyUI', 'carbon-svelte': 'Carbon Svelte',
  tailwind: 'Tailwind CSS', 'css-modules': 'CSS Modules', 'styled-components': 'Styled Comps', scss: 'SCSS',
  lucide: 'Lucide', 'react-icons': 'React Icons', heroicons: 'Heroicons',
  zustand: 'Zustand', 'redux-toolkit': 'Redux Toolkit', jotai: 'Jotai', 'context-api': 'Context API',
  pinia: 'Pinia', vuex: 'Vuex', 'svelte-store': 'Svelte Stores',
  'tanstack-query': 'TanStack Query', swr: 'SWR', 'nuxt-built-in': 'Nuxt built-in', 'sveltekit-built-in': 'SvelteKit load()',
  eslint: 'ESLint', biome: 'Biome', oxc: 'OXC', prettier: 'Prettier',
  'husky-lint-staged': 'Husky+staged', lefthook: 'Lefthook',
  jest: 'Jest', vitest: 'Vitest', playwright: 'Playwright', cypress: 'Cypress',
  'github-actions': 'GH Actions', 'gitlab-ci': 'GitLab CI',
  spa: 'SPA', ssr: 'SSR', monorepo: 'Monorepo',
  'feature-based': 'Feature-based', 'layer-based': 'Layer-based',
  'kebab-case': 'kebab-case', camelCase: 'camelCase',
  'framework-first': 'Framework first', 'absolute-then-relative': 'Absolute paths first',
  '3-tier': '3-tier colors', '5-tier': '5-tier colors',
  'css-vars': 'CSS Variables', 'js-object': 'JS Object', both: 'Dual output',
  none: 'None',
  // Theme styles (abbreviated for display)
  minimalism: 'Minimalism', neumorphism: 'Neumorphism', glassmorphism: 'Glassmorphism',
  brutalism: 'Brutalism', '3d-hyperrealism': '3D Hyperreal', 'vibrant-block': 'Vibrant Block',
  'dark-oled': 'Dark OLED', 'accessible-ethical': 'Accessible', claymorphism: 'Claymorphism',
  aurora: 'Aurora UI', retro: 'Retro-Future', flat: 'Flat Design',
  skeuomorphism: 'Skeuo', 'liquid-glass': 'Liquid Glass', 'motion-driven': 'Motion',
  'micro-interactions': 'Micro-UI', 'inclusive-design': 'Inclusive', 'zero-interface': 'Zero UI',
  'soft-ui': 'Soft UI', neubrutalism: 'Neubrutalism', bento: 'Bento Grid',
  y2k: 'Y2K', cyberpunk: 'Cyberpunk', 'organic-biophilic': 'Biophilic',
  'ai-native': 'AI-Native', memphis: 'Memphis', vaporwave: 'Vaporwave',
  'dimensional-layering': 'Dimensional', 'exaggerated-minimalism': 'Exag-Minimal',
  'kinetic-typography': 'Kinetic Type', 'parallax-storytelling': 'Parallax',
  'swiss-modernism-2': 'Swiss 2.0', 'hud-scifi': 'HUD Sci-Fi', 'pixel-art': 'Pixel Art',
  'bento-grids': 'Bento Grids', 'spatial-ui': 'Spatial UI', 'e-ink': 'E-Ink',
  'gen-z-chaos': 'Gen Z Chaos', biomimetic: 'Biomimetic', 'anti-polish': 'Anti-Polish',
  'tactile-digital': 'Tactile', 'nature-distilled': 'Nature', 'interactive-cursor': 'Cursor',
  'voice-first': 'Voice-First', '3d-product': '3D Product', 'gradient-mesh': 'Gradient Mesh',
  'editorial-grid': 'Editorial', 'chromatic-aberration': 'RGB Split', 'vintage-analog': 'Vintage',
}

function displayValue(key: string, value: unknown): string {
  if (Array.isArray(value)) {
    if (value.length === 0) return 'None'
    return value.map((v) => DISPLAY_MAP[String(v)] ?? String(v)).join(', ')
  }
  return DISPLAY_MAP[String(value)] ?? String(value)
}

export function SelectionSummary() {
  const state = useWizardStore()
  const currentStep = useWizardStore((s) => s.currentStep)

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Current Configuration Summary
      </p>
      {STEP_FIELDS.map((section, idx) => (
        <div key={idx} className={idx > currentStep ? 'opacity-40' : ''}>
          <p className="mb-1.5 text-xs font-medium text-foreground/70">{section.label}</p>
          <div className="flex flex-wrap gap-1.5">
            {section.fields.map((field) => {
              const value = (state as unknown as Record<string, unknown>)[field]
              const display = displayValue(field, value)
              if (display === 'None' && field !== 'testing') return null
              return (
                <Badge key={field} variant="secondary" className="text-[11px] px-1.5 py-0">
                  {display}
                </Badge>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
