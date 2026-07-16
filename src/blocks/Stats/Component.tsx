'use client'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef } from 'react'

import { Media } from '@/components/Media'
import { AnimateIn } from '@/components/AnimateIn'

type Props = StatsBlockProps & { className?: string; disableInnerContainer?: boolean }

function parseNumber(raw: string): { prefix: string; number: number; suffix: string } | null {
  const match = raw.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)([^0-9]*)$/)
  if (!match) return null
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] }
}

function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parseNumber(value)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!parsed || hasRun.current) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return
        hasRun.current = true
        observer.disconnect()

        const { prefix, number, suffix } = parsed
        const duration = 1200
        const start = performance.now()
        const isFloat = number % 1 !== 0
        const decimals = isFloat ? (number.toString().split('.')[1]?.length ?? 0) : 0

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1)
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = number * eased
          el!.textContent = prefix + (isFloat ? current.toFixed(decimals) : Math.floor(current).toString()) + suffix
          if (progress < 1) requestAnimationFrame(tick)
          else el!.textContent = prefix + (isFloat ? number.toFixed(decimals) : number.toString()) + suffix
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.3 },
    )
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  if (!parsed) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      {parsed.prefix}0{parsed.suffix}
    </span>
  )
}

export const StatsBlock: React.FC<Props> = ({ className, title, subtitle, layout = 'grid', items }) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <AnimateIn variant="fade-up">
          <div className="mb-10 text-center">
            {title && <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>}
            {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
          </div>
        </AnimateIn>
      )}

      <div
        className={cn({
          'grid gap-8 sm:grid-cols-2 lg:grid-cols-4': layout === 'grid',
          'flex flex-wrap justify-center gap-12': layout === 'inline',
        })}
      >
        {items.map((item, i) => (
          <AnimateIn key={i} variant="fade-up" delay={Math.min(i, 3) * 80}>
            <div className="flex flex-col items-center gap-2 text-center">
              {item.icon && (
                <div className="mb-1 h-10 w-10">
                  <Media resource={item.icon} imgClassName="h-full w-full object-contain" />
                </div>
              )}
              <CountUp value={item.value} className="text-4xl font-extrabold tracking-tight tabular-nums" />
              <span className="font-semibold">{item.label}</span>
              {item.description && (
                <span className="text-sm text-muted-foreground">{item.description}</span>
              )}
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  )
}
