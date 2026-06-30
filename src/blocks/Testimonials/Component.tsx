import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = TestimonialsBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

const Stars: React.FC<{ rating: string }> = ({ rating }) => {
  const count = parseInt(rating, 10)
  return (
    <div className="flex gap-0.5 text-yellow-400">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

export const TestimonialsBlock: React.FC<Props> = ({
  className,
  title,
  layout = 'grid',
  items,
}) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {title && <h2 className="mb-8 text-center text-3xl font-bold text-orange-500">{title}</h2>}

      <div
        className={cn({
          'grid gap-6 sm:grid-cols-2 lg:grid-cols-3': layout === 'grid',
          'flex flex-col gap-6': layout === 'list',
          'flex gap-6 overflow-x-auto pb-4': layout === 'carousel',
        })}
      >
        {items.map((item, i) => (
          <blockquote
            key={i}
            className={cn(
              'flex flex-col gap-4 rounded-xl border border-border bg-card p-6',
              { 'min-w-[300px]': layout === 'carousel' },
            )}
          >
            {item.rating && <Stars rating={item.rating} />}

            <p className="flex-1 text-muted-foreground">"{item.quote}"</p>

            <footer className="flex items-center gap-3">
              {item.avatar && (
                <div className="h-10 w-10 overflow-hidden rounded-full">
                  <Media resource={item.avatar} imgClassName="h-full w-full object-cover" />
                </div>
              )}
              <div>
                <p className="font-semibold leading-tight">{item.author}</p>
                {(item.role || item.company) && (
                  <p className="text-sm text-muted-foreground">
                    {[item.role, item.company].filter(Boolean).join(' · ')}
                  </p>
                )}
              </div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  )
}
