'use client'

import type { NewsletterBlock as NewsletterBlockProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { isLightBackground } from '@/utilities/colorContrast'
import { useTheme } from '@/providers/Theme'
import React, { useState } from 'react'

type Props = NewsletterBlockProps & { className?: string; disableInnerContainer?: boolean }

const CheckIcon = () => (
  <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

export const NewsletterBlock: React.FC<Props> = ({
  className,
  title,
  description,
  layout = 'centered',
  inputPlaceholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  actionUrl,
  successMessage = 'Thanks for subscribing!',
  disclaimer,
  backgroundColor,
}) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { theme } = useTheme()
  const isDarkMode = theme === 'dark'
  const isLightBg = backgroundColor ? isLightBackground(backgroundColor) : null

  // In dark mode, suppress light CMS colors — let --section-bg (dark) take over.
  // This prevents white-text-on-white-bg when someone chose a light CMS color.
  const activeBgColor = isDarkMode && isLightBg ? undefined : backgroundColor
  const hasDarkBg = isDarkMode || isLightBg === false

  const text = hasDarkBg ? 'text-white' : 'text-foreground'
  const textMuted = hasDarkBg ? 'text-white/70' : 'text-muted-foreground'
  const textFaint = hasDarkBg ? 'text-white/40' : 'text-muted-foreground/50'
  const inputCls = hasDarkBg
    ? 'border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-brand-primary focus:ring-brand-primary/40'
    : 'border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:border-brand-primary focus:ring-brand-primary/40'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      if (actionUrl) {
        await fetch(actionUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      }
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn('cms-bg w-full', className)}
      style={activeBgColor ? ({ '--cms-bg': activeBgColor } as React.CSSProperties) : undefined}
    >
      <div
        className={cn('container py-20 lg:py-[7.5rem]', {
          'text-center': layout !== 'inline',
          'flex flex-col md:flex-row md:items-center md:justify-between gap-8': layout === 'inline',
        })}
      >
        {/* ── Text block ── */}
        <div className={cn({ 'flex-1': layout === 'inline' })}>
          {/* Decorative divider */}
          {layout !== 'inline' && (
            <div className="mb-6 flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-brand-primary" />
              <span className="text-xl text-brand-primary">✦</span>
              <span className="h-px w-16 bg-brand-primary" />
            </div>
          )}

          {title && (
            <h2 className={cn('text-3xl font-extrabold uppercase tracking-wide md:text-4xl lg:text-5xl', text)}>
              {title}
            </h2>
          )}

          {description && (
            <p
              className={cn('mt-3 text-base md:text-lg', textMuted, {
                'mx-auto max-w-xl': layout !== 'inline',
              })}
            >
              {description}
            </p>
          )}
        </div>

        {/* ── Form block ── */}
        <div className={cn({ 'shrink-0 w-full md:max-w-sm': layout === 'inline' })}>
          {submitted ? (
            <div
              className={cn('flex flex-col items-center gap-3', {
                'mt-8': layout !== 'inline',
              })}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary">
                <CheckIcon />
              </div>
              <p className={cn('text-lg font-semibold', text)}>{successMessage}</p>
            </div>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className={cn('flex gap-2', {
                  'mt-8 mx-auto max-w-md': layout === 'centered',
                  'mt-6 flex-col': layout === 'stacked',
                  'mt-0': layout === 'inline',
                })}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={inputPlaceholder ?? 'Enter your email'}
                  className={cn('flex-1 rounded-full border px-5 py-3 text-sm outline-none transition focus:ring-2', inputCls)}
                />
                <Button
                  type="submit"
                  loading={loading}
                  showArrow={false}
                  className="shrink-0"
                >
                  {buttonLabel ?? 'Subscribe'}
                </Button>
              </form>

              {disclaimer && (
                <p
                  className={cn('mt-3 text-xs', textFaint, {
                    'text-center': layout !== 'inline',
                  })}
                >
                  {disclaimer}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
