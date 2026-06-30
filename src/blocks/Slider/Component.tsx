'use client'

import type { SliderBlock as SliderBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Props = SliderBlockProps & { className?: string; disableInnerContainer?: boolean }

type Slide = NonNullable<SliderBlockProps['slides']>[0]

const overlayClass: Record<string, string> = {
  'bottom-left':   'items-end justify-start text-left',
  'bottom-center': 'items-end justify-center text-center',
  'center':        'items-center justify-center text-center',
}

export const SliderBlock: React.FC<Props> = ({
  className,
  title,
  autoplay = false,
  autoplaySpeed = 4000,
  showArrows = true,
  showDots = true,
  slides,
}) => {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const count = slides?.length ?? 0

  const go = useCallback(
    (index: number) => {
      setCurrent((index + count) % count)
    },
    [count],
  )

  const prev = useCallback(() => go(current - 1), [current, go])
  const next = useCallback(() => go(current + 1), [current, go])

  // Autoplay
  useEffect(() => {
    if (!autoplay || count < 2) return
    timerRef.current = setTimeout(next, autoplaySpeed ?? 4000)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [autoplay, autoplaySpeed, current, count, next])

  if (!slides?.length) return null

  return (
    <div className={cn('w-full', className)}>
      {title && <h2 className="mb-6 px-4 text-2xl font-bold text-orange-500">{title}</h2>}

      <div className="relative w-full overflow-hidden">
        {/* Track */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide: Slide, i) => (
            <div key={i} className="relative min-w-full">
              {/* Image */}
              <div className="h-[100svh] md:h-auto md:aspect-[16/6] w-full overflow-hidden">
                <Media
                  resource={isMobile && (slide as any).mobileImage ? (slide as any).mobileImage : slide.image}
                  imgClassName="h-full w-full object-cover"
                />
              </div>

              {/* Overlay */}
              {(slide.title || slide.description || slide.enableLink) && (
                <div
                  className={cn(
                    'absolute inset-0 flex bg-gradient-to-t from-black/60 via-black/20 to-transparent p-8',
                    overlayClass[slide.overlayPosition ?? 'bottom-left'],
                  )}
                >
                  <div className="flex max-w-lg flex-col gap-3 text-white">
                    {slide.title && (
                      <h3 className="text-2xl font-bold drop-shadow-md">{slide.title}</h3>
                    )}
                    {slide.description && (
                      <div className="text-sm text-white/90 drop-shadow-sm [&_*]:text-white/90">
                        <RichText data={slide.description} enableGutter={false} enableProse={false} />
                      </div>
                    )}
                    {slide.enableLink && slide.link && (
                      <div>
                        <CMSLink {...slide.link} appearance={slide.link.appearance ?? 'default'} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Arrows */}
        {showArrows && count > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/60"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {showDots && count > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {slides.map((_: Slide, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === current ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
