import type { TeamBlock as TeamBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'

import { Media } from '@/components/Media'

type Props = TeamBlockProps & { className?: string; disableInnerContainer?: boolean }

const columnClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

const socialIcon: Record<string, string> = {
  linkedin: 'in',
  twitter: '𝕏',
  github: 'GH',
  website: '↗',
}

export const TeamBlock: React.FC<Props> = ({
  className,
  title,
  subtitle,
  layout = 'grid',
  columns = '3',
  members,
}) => {
  if (!members?.length) return null

  return (
    <div className={cn('container', className)}>
      {(title || subtitle) && (
        <div className="mb-10 text-center">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn('grid gap-8', columnClass[columns ?? '3'], {
          'grid-cols-1': layout === 'list',
        })}
      >
        {members.map((member, i) => (
          <div
            key={i}
            className={cn('flex gap-5 rounded-xl border border-border bg-card p-6', {
              'flex-col items-center text-center': layout === 'grid',
              'flex-row items-start': layout === 'list',
            })}
          >
            {member.photo && (
              <div
                className={cn('overflow-hidden rounded-full', {
                  'mx-auto h-24 w-24': layout === 'grid',
                  'h-16 w-16 shrink-0': layout === 'list',
                })}
              >
                <Media resource={member.photo} imgClassName="h-full w-full object-cover" />
              </div>
            )}

            <div>
              <p className="font-bold">{member.name}</p>
              {member.role && (
                <p className="text-sm text-primary">{member.role}</p>
              )}
              {member.bio && (
                <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
              )}
              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="mt-3 flex gap-3">
                  {member.socialLinks.map((link, j) => (
                    <a
                      key={j}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                      aria-label={link.platform ?? ''}
                    >
                      {socialIcon[link.platform ?? ''] ?? '↗'}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
