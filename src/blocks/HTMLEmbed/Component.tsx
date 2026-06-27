import type { HTMLEmbedBlock as HTMLEmbedBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

type Props = HTMLEmbedBlockProps & { className?: string; disableInnerContainer?: boolean }

export const HTMLEmbedBlock: React.FC<Props> = ({ className, html, caption }) => {
  if (!html) return null

  return (
    <div className={cn('container', className)}>
      {/* Only render trusted admin-authored HTML */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground">{caption}</p>
      )}
    </div>
  )
}
