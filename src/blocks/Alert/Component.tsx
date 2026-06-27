'use client'

import type { AlertBlock as AlertBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

type Props = AlertBlockProps & { className?: string; disableInnerContainer?: boolean }

const styleConfig: Record<string, { wrapper: string; icon: string }> = {
  info:    { wrapper: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100', icon: 'ℹ️' },
  success: { wrapper: 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100', icon: '✅' },
  warning: { wrapper: 'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100', icon: '⚠️' },
  error:   { wrapper: 'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100', icon: '❌' },
}

export const AlertBlock: React.FC<Props> = ({
  className,
  style = 'info',
  title,
  message,
  showIcon = true,
  dismissible = false,
}) => {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  const config = styleConfig[style] ?? styleConfig['info']

  return (
    <div className={cn('container', className)}>
      <div className={cn('flex gap-3 rounded-lg border p-4', config.wrapper)}>
        {showIcon && <span className="shrink-0 text-lg leading-tight">{config.icon}</span>}

        <div className="flex-1">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <RichText data={message} enableGutter={false} enableProse={false} />
        </div>

        {dismissible && (
          <button
            onClick={() => setDismissed(true)}
            className="shrink-0 text-current opacity-60 hover:opacity-100"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
