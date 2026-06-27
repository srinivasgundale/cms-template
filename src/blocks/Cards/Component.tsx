import type { CardsBlock as CardsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import Link from 'next/link'
import React from 'react'

import { Media } from '@/components/Media'

type Props = CardsBlockProps & { className?: string; disableInnerContainer?: boolean }

const columnClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

type CardItem = NonNullable<CardsBlockProps['items']>[0]

const resolveHref = (link: CardItem['link']): string => {
  if (!link) return '#'
  if (link.type === 'custom') return link.url ?? '#'
  const ref = link.reference?.value
  if (ref && typeof ref === 'object' && 'slug' in ref) return `/${ref.slug}`
  return '#'
}

export const CardsBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  layout = 'grid',
  columns = '3',
  items,
}) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn('grid gap-6', columnClass[columns ?? '3'], {
          'grid-cols-1': layout === 'list',
        })}
      >
        {items.map((item, i) => {
          const href = item.enableLink ? resolveHref(item.link) : null
          const sharedClass = cn(
            'group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow',
            { 'hover:shadow-md': !!href },
            { 'flex-row': layout === 'list' },
          )

          return href ? (
            <Link
              key={i}
              href={href}
              target={item.link?.newTab ? '_blank' : undefined}
              className={sharedClass}
            >
              {item.image && (
                <div className={cn('overflow-hidden', { 'h-48': layout === 'grid', 'h-32 w-32 shrink-0': layout === 'list' })}>
                  <Media
                    resource={item.image}
                    imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                {item.badge && (
                  <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {item.badge}
                  </span>
                )}
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
                {item.enableLink && item.link?.label && (
                  <span className="mt-auto pt-2 text-sm font-medium text-primary">
                    {item.link.label} →
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <div key={i} className={sharedClass}>
              {item.image && (
                <div className={cn('overflow-hidden', { 'h-48': layout === 'grid', 'h-32 w-32 shrink-0': layout === 'list' })}>
                  <Media
                    resource={item.image}
                    imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-2 p-5">
                {item.badge && (
                  <span className="w-fit rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    {item.badge}
                  </span>
                )}
                <h3 className="font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
