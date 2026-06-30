import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = LogoCloudBlockProps & { className?: string; disableInnerContainer?: boolean }

export const LogoCloudBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  layout = 'row',
  grayscale = true,
  logos,
}) => {
  if (!logos?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && <h2 className="text-2xl font-bold text-orange-500">{title}</h2>}
          {subtitle && <p className="mt-1 text-black">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn({
          'flex flex-wrap items-center justify-center gap-8': layout === 'row',
          'grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5': layout === 'grid',
        })}
      >
        {logos.map((item, i) => {
          const img = (
            <div
              className={cn('flex h-12 items-center justify-center', {
                '[&_img]:grayscale [&_img]:opacity-60 [&_img]:transition-all [&_img]:hover:grayscale-0 [&_img]:hover:opacity-100':
                  grayscale,
              })}
            >
              <Media
                resource={item.logo}
                imgClassName="max-h-10 w-auto object-contain"
                alt={item.name ?? ''}
              />
            </div>
          )

          return item.url ? (
            <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name ?? 'Logo'}>
              {img}
            </a>
          ) : (
            <div key={i}>{img}</div>
          )
        })}
      </div>
    </div>
  )
}
