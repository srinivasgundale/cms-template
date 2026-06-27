import type { FAQBlock as FAQBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = FAQBlockProps & { className?: string; disableInnerContainer?: boolean }

export const FAQBlock: React.FC<Props> = ({ className, title, subtitle, items }) => {
  if (!items?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div className="mx-auto max-w-3xl divide-y divide-border">
        {items.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {item.question}
              <span className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="mt-4 text-muted-foreground">
              <RichText data={item.answer} enableGutter={false} />
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
