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
  imageShape = 'square',
  backgroundColor,
  image,
  subtitle,
  title,
  description,
  enableLink,
  link,
}) => {
  const isHorizontal = imagePosition === 'left' || imagePosition === 'right'

  const imageOrder = imagePosition === 'right' || imagePosition === 'bottom' ? 'order-2' : 'order-1'
  const contentOrder = imagePosition === 'right' || imagePosition === 'bottom' ? 'order-1' : 'order-2'

  return (
    <div
      className={cn('cms-bg w-full', className)}
      style={{ '--cms-bg': backgroundColor || '#ffffff' } as React.CSSProperties}
    >
      <div className="container py-16 md:py-20 lg:py-24">
        <div
          className={cn('flex gap-10 lg:gap-16', {
            'flex-col md:flex-row items-center': isHorizontal,
            'flex-col items-center': !isHorizontal,
          })}
        >
          {/* Image */}
          <div
            className={cn(imageOrder, {
              'w-full md:w-[45%] shrink-0': isHorizontal,
              'w-full': !isHorizontal,
            })}
          >
            {imageShape === 'circle' ? (
              <div className="relative rounded-full aspect-square mx-auto w-full max-w-[400px] overflow-hidden">
                <Media
                  resource={image}
                  fill
                  imgClassName="object-cover"
                />
              </div>
            ) : (
              <Media
                resource={image}
                imgClassName="w-full object-cover"
              />
            )}
          </div>

          {/* Content */}
          <div
            className={cn(contentOrder, 'flex flex-col gap-4 justify-center', {
              'w-full md:w-[55%]': isHorizontal,
              'container max-w-2xl text-center': !isHorizontal,
            })}
          >
            <h2 className="text-3xl font-bold leading-tight lg:text-4xl text-orange-500">
              {title}
            </h2>

            {subtitle && (
              <p className="text-lg font-medium text-black">{subtitle}</p>
            )}

            {description && (
              <div className="text-black text-base leading-relaxed">
                <RichText data={description} enableGutter={false} />
              </div>
            )}

            {enableLink && link && (
              <div className={cn('mt-2', { 'mx-auto': !isHorizontal })}>
                <div className="[&_a]:inline-block [&_a]:bg-[#E07800] [&_a]:text-white [&_a]:border-2 [&_a]:border-[#E07800] [&_a]:hover:bg-[#C06000] [&_a]:hover:border-[#C06000] [&_a]:font-bold [&_a]:uppercase [&_a]:tracking-widest [&_a]:text-sm [&_a]:px-8 [&_a]:py-3 [&_a]:rounded [&_a]:transition-colors [&_a]:no-underline">
                  <CMSLink {...link} appearance="default" size="lg" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
