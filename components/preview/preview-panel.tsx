'use client'

import { useEffect, useState, type ComponentType } from 'react'
import { useWizardStore } from '@/lib/wizard-store'
import { SelectionSummary } from './selection-summary'

type LazyPanel = ComponentType | null

export function PreviewPanel() {
  const { generatedDoc, isGenerating, error, currentStep } = useWizardStore()
  const [GeneratedDoc, setGeneratedDoc] = useState<LazyPanel>(null)
  const [TokenPreview, setTokenPreview] = useState<LazyPanel>(null)

  const showDoc = generatedDoc || isGenerating || error

  useEffect(() => {
    if (!showDoc || GeneratedDoc) return
    let cancelled = false
    import('./generated-doc').then((m) => {
      if (!cancelled) setGeneratedDoc(() => m.GeneratedDoc)
    })
    return () => {
      cancelled = true
    }
  }, [GeneratedDoc, showDoc])

  useEffect(() => {
    if (currentStep !== 6 || TokenPreview) return
    let cancelled = false
    import('./token-preview').then((m) => {
      if (!cancelled) setTokenPreview(() => m.TokenPreview)
    })
    return () => {
      cancelled = true
    }
  }, [TokenPreview, currentStep])

  return (
    <div className="flex flex-col h-screen">
      <div className="shrink-0 border-b bg-muted/20 px-4 py-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {showDoc ? 'Generated Result' : 'Live Preview'}
        </p>
      </div>

      <div id="preview-scroll" className="flex-1 overflow-y-auto p-4">
        {showDoc ? (
          GeneratedDoc ? <GeneratedDoc /> : <div className="text-sm text-muted-foreground">Loading preview...</div>
        ) : (
          <div className="space-y-6">
            <SelectionSummary />
            {currentStep === 6 && (
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Token System Preview
                </p>
                {TokenPreview ? <TokenPreview /> : (
                  <div className="text-sm text-muted-foreground">Loading token preview...</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
