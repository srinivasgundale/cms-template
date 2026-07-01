import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import { Media } from '@/components/Media'

type Props = TimelineBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const TimelineBlock: React.FC<Props> = ({
  className,
  title,
  layout = 'vertical',
  items,
}) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {title && <h2 className="mb-10 text-center text-3xl font-bold text-brand-primary">{title}</h2>}

      <div
        className={cn('relative', {
          'flex flex-col gap-0': layout === 'vertical' || layout === 'alternating',
          'flex flex-row gap-0 overflow-x-auto': layout === 'horizontal',
        })}
      >
        {/* Connector line */}
        {layout === 'vertical' && (
          <div className="absolute left-[18px] top-3 h-[calc(100%-1.5rem)] w-0.5 bg-border" />
        )}

        {items.map((item, i) => (
          <div
            key={i}
            className={cn('relative flex gap-6', {
              'pb-10': layout === 'vertical',
              'flex-row-reverse': layout === 'alternating' && i % 2 !== 0,
              'min-w-[220px] flex-col items-center px-6': layout === 'horizontal',
            })}
          >
            {/* Dot / Icon */}
            <div
              className={cn(
                'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background',
                { 'mx-auto': layout === 'horizontal' },
              )}
            >
              {item.icon ? (
                <Media resource={item.icon} imgClassName="h-5 w-5 object-contain" />
              ) : (
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              )}
            </div>

            {/* Horizontal connector */}
            {layout === 'horizontal' && i < items.length - 1 && (
              <div className="absolute left-1/2 top-[18px] h-0.5 w-full bg-border" />
            )}

            {/* Content */}
            <div className={cn({ 'text-center': layout === 'horizontal' })}>
              {item.date && (
                <p className="mb-1 text-sm font-medium text-primary">{item.date}</p>
              )}
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.description && (
                <div className="mt-2 text-muted-foreground">
                  <RichText data={item.description} enableGutter={false} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
