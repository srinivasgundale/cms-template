import type { ContentWithImageBlock as ContentWithImageBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

type Props = ContentWithImageBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ContentWithImageBlock: React.FC<Props> = ({
  className,
  imagePosition = 'right',
  image,
  subtitle,
  title,
  description,
  enableLink,
  link,
}) => {
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right'

  // Image appears first in DOM; order classes flip the visual position
  const imageOrder = imagePosition === 'right' || imagePosition === 'bottom' ? 'order-2' : 'order-1'
  const contentOrder = imagePosition === 'right' || imagePosition === 'bottom' ? 'order-1' : 'order-2'

  // Vertical (top/bottom) layouts: image is full-width, text is contained
  return (
    <div className={cn(!isHorizontal ? 'w-full' : 'container', className)}>
      <div
        className={cn('flex gap-10 lg:gap-16', {
          'flex-col md:flex-row items-center': isHorizontal,
          'flex-col items-center': !isHorizontal,
        })}
      >
        {/* Image */}
        <div
          className={cn(imageOrder, 'overflow-hidden', {
            'rounded-xl w-full md:w-1/2 shrink-0': isHorizontal,
            'w-full max-h-[560px]': !isHorizontal,
          })}
        >
          <Media
            resource={image}
            imgClassName="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className={cn(contentOrder, 'flex flex-col gap-5 justify-center', {
            'w-full md:w-1/2': isHorizontal,
            'container max-w-2xl text-center': !isHorizontal,
          })}
        >
          {subtitle && (
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {subtitle}
            </p>
          )}

          <h2 className="text-3xl font-bold leading-tight lg:text-4xl">{title}</h2>

          {description && (
            <div className="text-muted-foreground">
              <RichText data={description} enableGutter={false} />
            </div>
          )}

          {enableLink && link && (
            <div className={cn({ 'mx-auto': !isHorizontal })}>
              <CMSLink {...link} appearance={link.appearance ?? 'default'} size="lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
