'use client'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ScrollHint } from '@/components/ui/scroll-hint'
import { AnimateIn } from '@/components/AnimateIn'
import { isLightBackground } from '@/utilities/colorContrast'

type GalleryImage = NonNullable<GalleryBlockProps['images']>[0]
type Props = GalleryBlockProps & { className?: string; disableInnerContainer?: boolean }

// ─── Column mappings ───────────────────────────────────────────────────────────
const gridCols: Record<string, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 sm:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
}

const masonryCols: Record<string, string> = {
  '2': 'columns-2',
  '3': 'columns-2 sm:columns-3',
  '4': 'columns-2 md:columns-3 lg:columns-4',
}

// ─── Shared thumbnail hover overlay ───────────────────────────────────────────
const Thumb: React.FC<{
  item: GalleryImage
  index: number
  onClick: () => void
  fill?: boolean
  className?: string
}> = ({ item, index, onClick, fill = true, className }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={`View image ${index + 1}${item.alt ? ': ' + item.alt : ''}`}
    className={cn('group relative block w-full overflow-hidden border-0 bg-muted p-0', className)}
  >
    {fill ? (
      <Media
        resource={item.image}
        fill
        pictureClassName="absolute inset-0"
        imgClassName="object-cover transition-transform duration-500 fine-hover:group-hover:scale-110"
      />
    ) : (
      <Media
        resource={item.image}
        imgClassName="w-full h-auto block transition-transform duration-500 fine-hover:group-hover:scale-110 origin-center"
      />
    )}
    {/* hover tint */}
    <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/25 pointer-events-none" />
    {/* caption reveal */}
    {item.caption && (
      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-6 transition-transform duration-300 group-hover:translate-y-0 pointer-events-none">
        <p className="text-sm text-white">{item.caption}</p>
      </div>
    )}
  </button>
)

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox: React.FC<{
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}> = ({ images, index, onClose, onPrev, onNext }) => {
  const item = images[index]
  const total = images.length
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  const caption = item.caption || item.alt

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95"
      onClick={onClose}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return
        const dx = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(dx) > 50) dx > 0 ? onNext() : onPrev()
        touchStartX.current = null
      }}
    >
      {/* Top bar */}
      <div
        className="flex shrink-0 items-center justify-between px-5 py-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium tabular-nums text-white/60">
          {index + 1} / {total}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main image */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-14 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        {total > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 z-10 rounded-full p-2 md:p-3 text-white/60 transition hover:bg-white/10 hover:text-white md:left-4"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        <div className="flex max-h-[74vh] max-w-[82vw] items-center justify-center">
          <Media
            resource={item.image}
            imgClassName="max-h-[74vh] max-w-[82vw] w-auto h-auto object-contain rounded"
            alt={item.alt ?? caption ?? `Image ${index + 1}`}
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 z-10 rounded-full p-2 md:p-3 text-white/60 transition hover:bg-white/10 hover:text-white md:right-4"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div
          className="shrink-0 py-3 text-center text-sm text-white/50"
          onClick={(e) => e.stopPropagation()}
        >
          {caption}
        </div>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="flex justify-center gap-1.5 pb-4" onClick={(e) => e.stopPropagation()}>
          {images.map((_, i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-[width,background-color] duration-300',
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/30',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Gallery block ─────────────────────────────────────────────────────────────
export const GalleryBlock: React.FC<Props> = ({
  className,
  title,
  layout: layoutProp,
  columns = '4',
  images,
  ctaTitle,
  ctaLink,
  backgroundColor,
}) => {
  const layout = layoutProp ?? 'carousel'
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const count = images?.length ?? 0
  const close = useCallback(() => setActiveIdx(null), [])
  const prev = useCallback(() => setActiveIdx((i) => (i !== null ? (i - 1 + count) % count : null)), [count])
  const next = useCallback(() => setActiveIdx((i) => (i !== null ? (i + 1) % count : null)), [count])

  const scrollCarousel = useCallback((dir: -1 | 1) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('div')?.offsetWidth ?? 280
    el.scrollBy({ left: dir * cardWidth * 2, behavior: 'smooth' })
  }, [])

  if (!images?.length) return null

  const hasCta = !!ctaTitle?.trim()
  const isLight = isLightBackground(backgroundColor)
  const ctaText = isLight ? 'text-foreground' : 'text-white'
  const ctaBorder = isLight ? 'border-foreground' : 'border-white'
  const ctaHover = isLight ? 'hover:bg-foreground hover:text-white' : 'hover:bg-white hover:text-foreground'

  return (
    <>
      <div className={cn('cms-bg w-full', !hasCta && 'pb-20 lg:pb-[7.5rem]', className)}>
        {title && (
          <AnimateIn variant="fade-up">
            <div className="container mb-8 pt-20 text-center lg:pt-[7.5rem]">
              <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>
            </div>
          </AnimateIn>
        )}

        {/* ── GRID layout ─────────────────────────────────────────────────── */}
        {layout === 'grid' && (
          <div className={cn('grid gap-[3px]', gridCols[columns ?? '4'] ?? gridCols['4'])}>
            {images.map((item, i) => (
              <AnimateIn key={i} variant="fade-up" delay={Math.min(i, 5) * 120}>
                <Thumb
                  item={item}
                  index={i}
                  fill
                  className="h-[200px] md:h-[340px] lg:h-[400px]"
                  onClick={() => setActiveIdx(i)}
                />
              </AnimateIn>
            ))}
          </div>
        )}

        {/* ── MASONRY layout ──────────────────────────────────────────────── */}
        {layout === 'masonry' && (
          <div className={cn('gap-x-[3px]', masonryCols[columns ?? '4'] ?? masonryCols['4'])}>
            {images.map((item, i) => (
              <AnimateIn key={i} variant="fade-in" delay={Math.min(i, 5) * 120} className="mb-[3px] break-inside-avoid overflow-hidden">
                <Thumb
                  item={item}
                  index={i}
                  fill={false}
                  onClick={() => setActiveIdx(i)}
                />
              </AnimateIn>
            ))}
          </div>
        )}

        {/* ── CAROUSEL layout ─────────────────────────────────────────────── */}
        {layout === 'carousel' && (
          <>
            <div className="group/strip relative">
              <button
                type="button"
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll gallery left"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 md:left-4 md:p-3 group-hover/strip:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <div
                ref={scrollRef}
                className="flex snap-x snap-mandatory gap-[3px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {images.map((item, i) => (
                  <div
                    key={i}
                    className="relative h-[280px] w-[220px] shrink-0 snap-start overflow-hidden md:h-[420px] md:w-[360px]"
                  >
                    <Thumb item={item} index={i} fill className="h-full w-full" onClick={() => setActiveIdx(i)} />
                  </div>
                ))}
              </div>

              <div
                className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-black/20 to-transparent"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll gallery right"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/70 focus-visible:opacity-100 md:right-4 md:p-3 group-hover/strip:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            <ScrollHint />
          </>
        )}

        {/* ── CTA strip ───────────────────────────────────────────────────── */}
        {hasCta && (
          <div
            className="cms-bg w-full py-20 lg:py-[7.5rem]"
            style={{ '--cms-bg': backgroundColor || '#3C1500' } as React.CSSProperties}
          >
            <div className="container flex flex-col items-center gap-6 text-center">
              <h3 className={cn('text-2xl font-extrabold uppercase leading-tight tracking-wide md:text-3xl lg:text-4xl', ctaText)}>
                {ctaTitle}
              </h3>
              {ctaLink?.label && (
                <CMSLink {...ctaLink} appearance="outline" className={cn(ctaBorder, ctaText, ctaHover)} />
              )}
            </div>
          </div>
        )}
      </div>

      {activeIdx !== null && (
        <Lightbox images={images} index={activeIdx} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
