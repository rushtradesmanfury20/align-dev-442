'use client'

import { useWizardStore } from '@/lib/wizard-store'
import { THEME_PRESETS, FUNCTIONAL_TOKEN_DEFS, isColorValue } from '@/lib/theme-tokens'
import { cn } from '@/lib/utils'

interface TokenPreviewProps {
  compact?: boolean
}

export function TokenPreview({ compact }: TokenPreviewProps) {
  const { themeStyle, customTokens, spacingBase, tokenConvention } = useWizardStore()

  const preset = THEME_PRESETS.find(p => p.id === themeStyle) ?? THEME_PRESETS[0]

  const FUNCTIONAL_VARS = FUNCTIONAL_TOKEN_DEFS.map(d => d.cssVar)
  const colorTokens = Object.entries(customTokens).filter(([k, v]) => isColorValue(v) && !FUNCTIONAL_VARS.includes(k))
  const functionalTokens = FUNCTIONAL_TOKEN_DEFS.map(d => ({ ...d, value: customTokens[d.cssVar] ?? '' })).filter(d => isColorValue(d.value))
  const otherTokens = Object.entries(customTokens).filter(([k, v]) => !isColorValue(v) && !FUNCTIONAL_VARS.includes(k))

  const spacingValues = spacingBase === 4
    ? [4, 8, 12, 16, 24, 32, 48, 64]
    : [8, 16, 24, 32, 48, 64, 80, 96]

  return (
    <div className={cn('space-y-4 rounded-lg border bg-muted/30 p-4', compact && 'text-xs')}>
      {/* Theme name */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {preset.palette.slice(0, 5).map((c, i) => (
            <div key={i} className="h-4 w-4 rounded-sm border border-black/10" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-xs font-medium">{preset.name}</span>
      </div>

      {/* Functional colors */}
      {functionalTokens.length > 0 && (
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Functional Colors</p>
          <div className="flex gap-2">
            {functionalTokens.map((d) => (
              <div key={d.cssVar} className="flex flex-col items-center gap-0.5 flex-1">
                <div className="h-6 w-full rounded border border-black/10" style={{ backgroundColor: d.value }} />
                <span className="text-[9px] font-medium">{d.label}</span>
                <span className="text-[8px] text-muted-foreground font-mono">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Color tokens */}
      {colorTokens.length > 0 && (
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Color Tokens</p>
          <div className="flex flex-wrap gap-2">
            {colorTokens.slice(0, compact ? 6 : 12).map(([cssVar, value]) => (
              <div key={cssVar} className="flex flex-col items-center gap-0.5">
                <div
                  className="h-6 w-8 rounded border border-black/10"
                  style={{ backgroundColor: value }}
                  title={`${cssVar}: ${value}`}
                />
                <span className="text-[9px] text-muted-foreground font-mono leading-none max-w-[32px] truncate">
                  {cssVar.replace('--color-', '')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Other tokens */}
      {otherTokens.length > 0 && (
        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Other Tokens</p>
          <div className="space-y-0.5">
            {otherTokens.map(([cssVar, value]) => (
              <div key={cssVar} className="flex items-center justify-between text-[10px]">
                <span className="font-mono text-muted-foreground">{cssVar}</span>
                <span className="font-mono text-foreground/70">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spacing */}
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Spacing — {spacingBase}px base
        </p>
        <div className="flex flex-wrap items-end gap-1">
          {spacingValues.slice(0, compact ? 6 : 8).map((v, i) => (
            <div key={i} className="flex flex-col items-end gap-0.5">
              <div
                className="bg-primary/30 rounded-sm"
                style={{ width: Math.min(v, 48), height: 10 }}
              />
              <span className="text-[9px] text-muted-foreground">{v}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Convention preview */}
      <div>
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Naming Convention</p>
        <pre className="rounded bg-muted px-2 py-1.5 text-[10px] font-mono text-muted-foreground leading-relaxed overflow-auto">
          {tokenConvention !== 'js-object'
            ? `:root {\n  --color-primary: ${customTokens['--color-primary'] ?? '#3b82f6'};\n  --radius-base: ${customTokens['--radius-base'] ?? '6px'};\n}`
            : `export const tokens = {\n  colorPrimary: '${customTokens['--color-primary'] ?? '#3b82f6'}',\n  radiusBase: '${customTokens['--radius-base'] ?? '6px'}',\n}`}
        </pre>
      </div>
    </div>
  )
}
