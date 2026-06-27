'use client'

import type { GalleryBlock as GalleryBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2, Share2, X, ZoomIn } from 'lucide-react'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type GalleryImage = NonNullable<GalleryBlockProps['images']>[0]

type Props = GalleryBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

// ─── Column grid classes ───────────────────────────────────────────────────────
const columnCls: Record<string, string> = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 sm:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-4',
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onPrev, onNext }) => {
  const item = images[index]
  const total = images.length

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const imageLabel = item.caption || item.alt || `image-${String(index + 1).padStart(2, '0')}`

  return (
    /* Backdrop — click outside image area to close */
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/90" onClick={onClose}>
      {/* ── Top bar ── */}
      <div
        className="flex shrink-0 items-center justify-between px-5 py-3 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-sm font-medium opacity-70">
          {index + 1} / {total}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded p-2 opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label="Fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded p-2 opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label="Zoom in"
          >
            <ZoomIn className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded p-2 opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label="Share"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-1 rounded p-2 opacity-70 hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Main image ── */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-14 md:px-20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prev arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 md:left-4 z-10 rounded-full p-2 md:p-3 text-white opacity-60 transition hover:opacity-100 hover:bg-white/10"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
        )}

        {/* Centered image */}
        <div className="flex max-h-[74vh] max-w-[82vw] items-center justify-center">
          <Media
            resource={item.image}
            imgClassName="max-h-[74vh] max-w-[82vw] w-auto h-auto object-contain rounded"
            alt={item.alt ?? imageLabel}
          />
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 md:right-4 z-10 rounded-full p-2 md:p-3 text-white opacity-60 transition hover:opacity-100 hover:bg-white/10"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        )}
      </div>

      {/* ── Bottom caption ── */}
      <div
        className="shrink-0 py-3 text-center text-sm text-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {imageLabel}
      </div>
    </div>
  )
}

// ─── Gallery block ─────────────────────────────────────────────────────────────
export const GalleryBlock: React.FC<Props> = ({
  className,
  title,
  columns = '4',
  images,
  ctaTitle,
  ctaLink,
  backgroundColor,
}) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const count = images?.length ?? 0
  const close = useCallback(() => setActiveIdx(null), [])
  const prev = useCallback(
    () => setActiveIdx((i) => (i !== null ? (i - 1 + count) % count : null)),
    [count],
  )
  const next = useCallback(
    () => setActiveIdx((i) => (i !== null ? (i + 1) % count : null)),
    [count],
  )

  // Keyboard navigation
  useEffect(() => {
    if (activeIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [activeIdx, close, prev, next])

  if (!images?.length) return null

  const colCls = columnCls[columns ?? '4'] ?? columnCls['4']

  return (
    <>
      <div className={cn('w-full', className)}>
        {title && (
          <div className="container mb-6 text-center">
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
        )}

        {/* ── Image strip ── */}
        <div className={cn('grid gap-[3px]', colCls)}>
          {images.map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              aria-label={`View image ${i + 1}${item.alt ? ': ' + item.alt : ''}`}
              className="group relative h-[200px] md:h-[380px] lg:h-[440px] overflow-hidden border-0 bg-muted p-0"
            >
              <Media
                resource={item.image}
                imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </button>
          ))}
        </div>

        {/* ── CTA strip ── */}
        {ctaTitle && (
          <div
            className="cms-bg w-full py-10 md:py-14"
            style={{ '--cms-bg': backgroundColor || '#3C1500' } as React.CSSProperties}
          >
            <div className="container flex flex-col items-center gap-6 text-center">
              <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-white md:text-3xl lg:text-4xl">
                {ctaTitle}
              </h3>

              {ctaLink?.label && (
                <div className="[&_a]:border-2 [&_a]:border-white [&_a]:bg-transparent [&_a]:text-white [&_a]:hover:bg-white [&_a]:hover:text-[#3C1500] [&_a]:font-semibold [&_a]:uppercase [&_a]:tracking-widest [&_a]:px-8 [&_a]:py-3 [&_a]:transition-colors">
                  <CMSLink {...ctaLink} appearance="outline" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Lightbox (portal-style, rendered outside gallery div) ── */}
      {activeIdx !== null && (
        <Lightbox images={images} index={activeIdx} onClose={close} onPrev={prev} onNext={next} />
      )}
    </>
  )
}
