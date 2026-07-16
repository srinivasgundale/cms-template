import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { ScrollHint } from '@/components/ui/scroll-hint'
import { AnimateIn } from '@/components/AnimateIn'
import React from 'react'

import { Media } from '@/components/Media'

type Props = TestimonialsBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

type Item = NonNullable<TestimonialsBlockProps['items']>[0]

const badgeColorClass: Record<string, string> = {
  green:  'bg-green-50 text-green-700 border-green-200',
  blue:   'bg-blue-50 text-blue-700 border-blue-200',
  orange: 'bg-orange-50 text-brand-primary border-brand-primary/30',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  red:    'bg-red-50 text-red-700 border-red-200',
  gray:   'bg-muted text-muted-foreground border-border',
}

const avatarBgClasses = [
  'bg-amber-800', 'bg-blue-800', 'bg-emerald-800', 'bg-purple-800',
  'bg-rose-800',  'bg-teal-700', 'bg-blue-700',    'bg-amber-700',
]

function getAvatarBgClass(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarBgClasses[Math.abs(hash) % avatarBgClasses.length]!
}

function getInitials(name: string): string {
  return name.split(' ').filter(Boolean).map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

const Stars: React.FC<{ rating: string }> = ({ rating }) => {
  const count = parseInt(rating, 10)
  return (
    <div className="flex gap-0.5 text-yellow-400 text-sm">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

const TestimonialCard: React.FC<{ item: Item; layout: string }> = ({ item, layout }) => {
  const badgeClass = badgeColorClass[item.badgeColor ?? 'green'] ?? badgeColorClass.green
  const initials = getInitials(item.author)
  const avatarBg = getAvatarBgClass(item.author)
  const meta = [item.role, item.tenure].filter(Boolean).join(' · ')

  const rawQuote = item.quote ?? ''
  const truncated = rawQuote.length > 200
  const displayQuote = truncated ? rawQuote.slice(0, 200).trimEnd() + '…' : rawQuote

  return (
    <blockquote
      className={cn(
        'flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-md transition-[transform,box-shadow] duration-300 fine-hover:hover:shadow-xl fine-hover:hover:-translate-y-1',
        layout === 'grid' && 'min-w-[280px] sm:min-w-0',
        layout === 'carousel' && 'min-w-[300px] sm:min-w-[360px]',
      )}
    >
      {/* Opening quote mark */}
      <span className="text-5xl font-serif leading-none text-brand-primary/80 select-none">"</span>

      {/* Rating */}
      {item.rating && <Stars rating={item.rating} />}

      {/* Quote body */}
      <p className="flex-1 text-base italic leading-relaxed text-foreground">
        {displayQuote}
        {!truncated && (
          <span className="not-italic font-serif text-brand-primary/70 select-none"> "</span>
        )}
      </p>

      {/* Footer */}
      <footer className="flex items-center gap-3">
        {item.avatar ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Media
              resource={item.avatar}
              fill
              pictureClassName="absolute inset-0"
              imgClassName="object-cover"
            />
          </div>
        ) : (
          <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white', avatarBg)}>
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="font-bold leading-tight text-foreground">{item.author}</p>
          {meta && <p className="text-xs text-muted-foreground mt-0.5">{meta}</p>}
        </div>

        {item.badge && (
          <span className={cn('shrink-0 rounded-full border px-3 py-0.5 text-xs font-semibold', badgeClass)}>
            {item.badge}
          </span>
        )}
      </footer>
    </blockquote>
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
      {title && <h2 className="mb-8 text-center text-3xl font-bold text-brand-primary">{title}</h2>}

      <div
        className={cn({
          'flex gap-6 overflow-x-auto pb-4 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-x-visible sm:pb-0 lg:grid-cols-3': layout === 'grid',
          'flex flex-col gap-6': layout === 'list',
          'flex gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden': layout === 'carousel',
        })}
      >
        {items.map((item, i) => (
          <AnimateIn key={i} variant="fade-up" delay={Math.min(i, 4) * 150}>
            <TestimonialCard item={item} layout={layout ?? 'grid'} />
          </AnimateIn>
        ))}
      </div>
      {layout !== 'list' && <ScrollHint />}
    </div>
  )
}
