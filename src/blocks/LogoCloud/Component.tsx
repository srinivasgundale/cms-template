import type { LogoCloudBlock as LogoCloudBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'
import { AnimateIn } from '@/components/AnimateIn'

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
          {title && <h2 className="text-2xl font-bold text-brand-primary">{title}</h2>}
          {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
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
            <div className="flex h-12 items-center justify-center">
              <Media
                resource={item.logo}
                imgClassName={cn('max-h-10 w-auto object-contain', grayscale && 'logo-hover-reveal')}
                alt={item.name ?? ''}
              />
            </div>
          )

          return item.url ? (
            <AnimateIn key={i} variant="fade-in" delay={Math.min(i, 5) * 60}>
              <a href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.name ?? 'Logo'}>
                {img}
              </a>
            </AnimateIn>
          ) : (
            <AnimateIn key={i} variant="fade-in" delay={Math.min(i, 5) * 60}>
              <div>{img}</div>
            </AnimateIn>
          )
        })}
      </div>
    </div>
  )
}
