'use client'

import type { NewsletterBlock as NewsletterBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'

type Props = NewsletterBlockProps & { className?: string; disableInnerContainer?: boolean }

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
}) => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)

    try {
      if (actionUrl ?? '') {
        await fetch(actionUrl as string, {
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
      className={cn('container', className, {
        'text-center': layout === 'centered',
      })}
    >
      <div
        className={cn('mx-auto rounded-2xl border border-border bg-card p-10', {
          'max-w-xl': layout === 'centered' || layout === 'stacked',
          'flex items-center justify-between gap-8': layout === 'inline',
        })}
      >
        {(title || description) && (
          <div className={cn({ 'flex-1': layout === 'inline' })}>
            {title && <h2 className="text-2xl font-bold">{title}</h2>}
            {description && (
              <p className="mt-2 text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        {submitted ? (
          <p className="mt-4 font-semibold text-primary">{successMessage}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className={cn('mt-6 flex gap-2', {
              'mt-0 flex-shrink-0': layout === 'inline',
              'flex-col': layout === 'stacked',
            })}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={inputPlaceholder ?? 'Enter your email'}
              className="rounded-md border border-border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? '...' : buttonLabel}
            </button>
          </form>
        )}

        {disclaimer && !submitted && (
          <p className="mt-3 text-xs text-muted-foreground">{disclaimer}</p>
        )}
      </div>
    </div>
  )
}
