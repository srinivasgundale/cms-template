'use client'

import type { TabsBlock as TabsBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

type Props = TabsBlockProps & { className?: string; disableInnerContainer?: boolean }

export const TabsBlock: React.FC<Props> = ({ className, alignment = 'left', tabs }) => {
  const [active, setActive] = useState(0)
  if (!tabs?.length) return null

  return (
    <div className={cn('container', className)}>
      {/* Tab bar */}
      <div
        className={cn('mb-6 flex flex-wrap gap-1 border-b border-border', {
          'justify-start': alignment === 'left',
          'justify-center': alignment === 'center',
          'justify-end': alignment === 'right',
        })}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              active === i
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.icon && <span className="mr-1.5">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab content */}
      <div>
        {tabs[active]?.content && (
          <RichText data={tabs[active].content} enableGutter={false} />
        )}
      </div>
    </div>
  )
}
