import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = GalleryBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

const columnClass: Record<string, string> = {
  '2': 'grid-cols-1 sm:grid-cols-2',
  '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export const GalleryBlock: React.FC<Props> = ({
  className,
  title,
  layout = 'grid',
  columns = '3',
  images,
}) => {
  if (!images?.length) return null

  return (
    <div className={cn('container', className)}>
      {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}

      <div
        className={cn('grid gap-4', columnClass[columns ?? '3'] ?? columnClass['3'], {
          'grid-flow-dense': layout === 'masonry',
        })}
      >
        {images.map((item, i) => (
          <figure key={i} className="overflow-hidden rounded-lg">
            <Media
              resource={item.image}
              imgClassName="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {item.caption && (
              <figcaption className="mt-1 text-center text-sm text-muted-foreground">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  )
}
