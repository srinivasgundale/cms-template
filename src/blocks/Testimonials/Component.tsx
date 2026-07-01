import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = TestimonialsBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

type Item = NonNullable<TestimonialsBlockProps['items']>[0]

const badgeColorClass: Record<string, string> = {
  green:  'bg-green-600/20 text-green-400 border-green-600/30',
  blue:   'bg-blue-600/20 text-blue-400 border-blue-600/30',
  orange: 'bg-brand-primary/20 text-brand-primary/80 border-brand-primary/30',
  purple: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  red:    'bg-red-600/20 text-red-400 border-red-600/30',
  gray:   'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const avatarColors = [
  '#92400e', '#1e40af', '#065f46', '#6b21a8',
  '#9f1239', '#0f766e', '#1d4ed8', '#b45309',
]

function getAvatarColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]!
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
  const avatarColor = getAvatarColor(item.author)

  const meta = [item.role, item.tenure].filter(Boolean).join(' · ')

  return (
    <blockquote
      className={cn(
        'flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#1a1a2e] p-6',
        { 'min-w-[300px] sm:min-w-[360px]': layout === 'carousel' },
      )}
    >
      {/* Opening quote mark */}
      <span className="text-5xl font-serif leading-none text-brand-primary/80 select-none">"</span>

      {/* Rating — only shown when set */}
      {item.rating && <Stars rating={item.rating} />}

      {/* Quote */}
      <p className="flex-1 text-base font-semibold italic leading-relaxed text-white">
        {item.quote}
      </p>

      {/* Footer */}
      <footer className="flex items-center gap-3">
        {/* Avatar */}
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
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
        )}

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <p className="font-bold leading-tight text-white">{item.author}</p>
          {meta && <p className="text-xs text-white/50 mt-0.5">{meta}</p>}
        </div>

        {/* Badge */}
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
          'grid gap-6 sm:grid-cols-2 lg:grid-cols-3': layout === 'grid',
          'flex flex-col gap-6': layout === 'list',
          'flex gap-6 overflow-x-auto pb-4': layout === 'carousel',
        })}
      >
        {items.map((item, i) => (
          <TestimonialCard key={i} item={item} layout={layout ?? 'grid'} />
        ))}
      </div>
    </div>
  )
}
