import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import { Media } from '@/components/Media'

type Props = FAQBlockProps & { className?: string; disableInnerContainer?: boolean }

export const FAQBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  items,
  image,
  imagePosition = 'left',
  backgroundColor,
}) => {
  if (!items?.length) return null

  const hasImage = Boolean(image)

  const header = (title || subtitle) ? (
    <div className={cn('mb-8', !hasImage && 'text-center')}>
      {title && <h2 className="text-3xl font-bold lg:text-4xl text-orange-500">{title}</h2>}
      {subtitle && <p className="mt-2 text-black">{subtitle}</p>}
    </div>
  ) : null

  const accordion = (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <details key={i} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
            {item.question}
            <span className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="mt-4 text-muted-foreground">
            <RichText data={item.answer} enableGutter={false} />
          </div>
        </details>
      ))}
    </div>
  )

  return (
    <div
      className={cn('cms-bg w-full', className)}
      style={{ '--cms-bg': backgroundColor || 'transparent' } as React.CSSProperties}
    >
      <div className="container py-16 md:py-20 lg:py-24">
        {hasImage ? (
          <div className="flex flex-col gap-10 md:flex-row md:items-start lg:gap-16">
            {imagePosition === 'left' && (
              <div className="w-full shrink-0 md:w-[45%] md:sticky md:top-24 md:self-center">
                <Media resource={image} imgClassName="w-full rounded-xl object-cover" />
              </div>
            )}

            <div className="flex-1 min-w-0">
              {header}
              {accordion}
            </div>

            {imagePosition === 'right' && (
              <div className="w-full shrink-0 md:w-[45%] md:sticky md:top-24 md:self-center">
                <Media resource={image} imgClassName="w-full rounded-xl object-cover" />
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {header}
            {accordion}
          </div>
        )}
      </div>
    </div>
  )
}
