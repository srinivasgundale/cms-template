'use client'

import type { FloatingCta } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useEffect, useState } from 'react'

import { Media } from '@/components/Media'

type Props = { data: FloatingCta }
type Item = NonNullable<FloatingCta['items']>[0]

// ─── Default colours per icon type ─────────────────────────────────────────
const defaultBg: Record<string, string> = {
  phone:     '#F97316',
  whatsapp:  '#25D366',
  email:     '#1e40af',
  chat:      '#1e40af',
  custom:    '#1e40af',
}

// ─── SVG Icons ──────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.29 21 3 13.71 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.01L6.6 10.8z" />
  </svg>
)

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
)

const ChatIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </svg>
)

const ChevronUpIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
  </svg>
)

const iconMap: Record<string, React.FC> = {
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  email: EmailIcon,
  chat: ChatIcon,
}

// ─── Single Bubble ───────────────────────────────────────────────────────────
const Bubble: React.FC<{ item: Item; compact?: boolean }> = ({ item, compact = false }) => {
  const bg = item.backgroundColor || defaultBg[item.icon ?? 'custom'] || '#1e40af'
  const IconComponent = iconMap[item.icon ?? 'custom']

  const inner = (
    <>
      {item.icon === 'custom' && item.customIcon ? (
        <div className="h-5 w-5 overflow-hidden">
          <Media resource={item.customIcon} imgClassName="h-full w-full object-contain" />
        </div>
      ) : IconComponent ? (
        <IconComponent />
      ) : null}
      {!compact && item.label && item.style !== 'bubble' && (
        <span className="font-semibold">{item.label}</span>
      )}
      {!compact && item.style === 'primary' && <ArrowRightIcon />}
    </>
  )

  // Outline button
  if (item.style === 'outline') {
    return (
      <a
        href={item.url}
        target={item.newTab ? '_blank' : undefined}
        rel={item.newTab ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition hover:opacity-90"
        style={{ borderColor: bg, color: bg }}
      >
        <IconComponent />
        {item.label && <span>{item.label}</span>}
      </a>
    )
  }

  // Primary button
  if (item.style === 'primary') {
    return (
      <a
        href={item.url}
        target={item.newTab ? '_blank' : undefined}
        rel={item.newTab ? 'noopener noreferrer' : undefined}
        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white shadow transition hover:opacity-90"
        style={{ backgroundColor: bg }}
      >
        <IconComponent />
        {item.label && <span className="font-semibold">{item.label}</span>}
        <ArrowRightIcon />
      </a>
    )
  }

  // Icon bubble (default)
  return (
    <a
      href={item.url}
      target={item.newTab ? '_blank' : undefined}
      rel={item.newTab ? 'noopener noreferrer' : undefined}
      className="flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition hover:scale-110 hover:shadow-xl"
      style={{ backgroundColor: bg }}
      aria-label={item.label ?? item.icon ?? ''}
      title={item.label ?? undefined}
    >
      {inner}
    </a>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────
export const FloatingCTAClient: React.FC<Props> = ({ data }) => {
  const { variant = 'bottom-bar', items, showScrollToTop } = data
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!items?.length) return null

  // ── Bottom Bar ─────────────────────────────────────────────────────────────
  if (variant === 'bottom-bar') {
    return (
      <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 shadow-2xl ring-1 ring-black/5">
          {items.map((item, i) => (
            <Bubble key={i} item={item} compact={item.style === 'bubble'} />
          ))}
        </div>
      </div>
    )
  }

  // ── Side Bubbles ───────────────────────────────────────────────────────────
  const isRight = variant === 'side-right'

  return (
    <div
      className={cn(
        'fixed top-1/2 z-50 -translate-y-1/2 flex flex-col items-center gap-3',
        isRight ? 'right-4' : 'left-4',
      )}
    >
      {items.map((item, i) => (
        <Bubble key={i} item={item} />
      ))}

      {showScrollToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg ring-1 ring-black/10 transition hover:scale-110',
            scrolled ? 'opacity-100' : 'pointer-events-none opacity-0',
          )}
        >
          <ChevronUpIcon />
        </button>
      )}
    </div>
  )
}
