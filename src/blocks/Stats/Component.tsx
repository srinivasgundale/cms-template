import type { StatsBlock as StatsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = StatsBlockProps & { className?: string; disableInnerContainer?: boolean }

export const StatsBlock: React.FC<Props> = ({ className, title, subtitle, layout = 'grid', items }) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>}
          {subtitle && <p className="mt-2 text-black">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn({
          'grid gap-8 sm:grid-cols-2 lg:grid-cols-4': layout === 'grid',
          'flex flex-wrap justify-center gap-12': layout === 'inline',
        })}
      >
        {items.map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2 text-center">
            {item.icon && (
              <div className="mb-1 h-10 w-10">
                <Media resource={item.icon} imgClassName="h-full w-full object-contain" />
              </div>
            )}
            <span className="text-4xl font-extrabold tracking-tight">{item.value}</span>
            <span className="font-semibold">{item.label}</span>
            {item.description && (
              <span className="text-sm text-muted-foreground">{item.description}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
