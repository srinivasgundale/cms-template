import type { VideoBlock as VideoBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = VideoBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

const getEmbedUrl = (url: string, source: string): string => {
  if (source === 'youtube') {
    const match = url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    const id = match?.[1]
    return id ? `https://www.youtube.com/embed/${id}` : url
  }
  if (source === 'vimeo') {
    const match = url.match(/vimeo\.com\/(\d+)/)
    const id = match?.[1]
    return id ? `https://player.vimeo.com/video/${id}` : url
  }
  return url
}

export const VideoBlock: React.FC<Props> = ({
  className,
  title,
  source,
  url,
  video,
  poster,
  caption,
  autoplay,
}) => {
  return (
    <div className={cn('container', className)}>
      {title && <h2 className="mb-4 text-2xl font-bold text-orange-500">{title}</h2>}

      <div className="overflow-hidden rounded-lg">
        {(source === 'youtube' || source === 'vimeo') && url && (
          <div className="relative aspect-video w-full">
            <iframe
              src={getEmbedUrl(url, source)}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={title ?? 'Video'}
            />
          </div>
        )}

        {source === 'upload' && video && typeof video === 'object' && video.url && (
          <video
            className="w-full rounded-lg"
            controls
            autoPlay={autoplay ?? false}
            muted={autoplay ?? false}
            poster={
              poster && typeof poster === 'object' && poster.url ? poster.url : undefined
            }
          >
            <source src={video.url} type={video.mimeType ?? 'video/mp4'} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {caption && (
        <p className="mt-2 text-center text-sm text-muted-foreground">{caption}</p>
      )}
    </div>
  )
}
