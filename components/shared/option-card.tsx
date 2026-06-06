'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { ReactNode } from 'react'

interface OptionCardProps {
  selected: boolean
  onClick: () => void
  icon?: ReactNode
  label: string
  description?: string
  disabled?: boolean
  className?: string
}

export function OptionCard({
  selected,
  onClick,
  icon,
  label,
  description,
  disabled,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative flex flex-col items-start gap-1.5 rounded-lg border bg-card p-4 text-left transition-all',
        'hover:border-primary/50 hover:shadow-sm',
        selected && 'border-primary ring-2 ring-primary/20 bg-primary/5',
        !selected && 'border-border',
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {selected && (
        <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </span>
      )}
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <span className="text-sm font-medium leading-tight pr-6">{label}</span>
      {description && (
        <span className="text-xs text-muted-foreground leading-snug">{description}</span>
      )}
    </button>
  )
}
