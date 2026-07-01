'use client'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ScrollHint } from '@/components/ui/scroll-hint'
import { AnimateIn } from '@/components/AnimateIn'
import React, { useState } from 'react'
import { Media } from '@/components/Media'

type Member = NonNullable<TeamBlockProps['members']>[number]
type Props = TeamBlockProps & { className?: string; disableInnerContainer?: boolean }

const columnClass: Record<string, string> = {
  '2': 'sm:grid-cols-2',
  '3': 'sm:grid-cols-2 lg:grid-cols-3',
  '4': 'sm:grid-cols-2 lg:grid-cols-4',
}

const COLOR_COUNT = 8 // matches data-color="0"–"7" in master.css

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const WebsiteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const SocialIcon: Record<string, React.FC> = {
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  github: GitHubIcon,
  website: WebsiteIcon,
}

const socialLabel: Record<string, string> = {
  linkedin: 'LinkedIn',
  twitter: 'Twitter / X',
  github: 'GitHub',
  website: 'Website',
}

function TeamMemberCard({ member, layout, index }: { member: Member; layout: string; index: number }) {
  const [flipped, setFlipped] = useState(false)

  const name = member.name ?? ''
  const initials = getInitials(name)
  const colorIndex = index % COLOR_COUNT
  const isGrid = layout === 'grid'

  return (
    // Plain div — no role="button" so <a> links on the back face aren't nested inside an interactive control
    <div
      className={cn('team-card', isGrid ? 'team-card--grid' : 'team-card--list')}
      data-color={colorIndex}
    >
      <div className={cn('team-card-inner', flipped && 'is-flipped')}>

        {/* ── Front — a <button> with no interactive children ── */}
        <button
          type="button"
          className={cn(
            'team-card-face w-full',
            isGrid
              ? 'flex flex-col items-center justify-between text-center'
              : 'flex flex-row items-center gap-4',
          )}
          onClick={() => setFlipped(true)}
          aria-label={`View bio for ${name}`}
        >
          {isGrid ? (
            <>
              {/* Avatar + name/role grouped at top-center */}
              <div className="flex flex-col items-center gap-3 w-full">
                {member.photo ? (
                  <div className="h-20 w-20 overflow-hidden rounded-full shrink-0">
                    <Media resource={member.photo} imgClassName="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="team-card-avatar h-20 w-20 text-xl">{initials}</div>
                )}
                <div className="w-full">
                  <p className="font-bold text-foreground leading-tight">{name}</p>
                  {member.role && (
                    <p className="text-sm mt-0.5 text-muted-foreground">{member.role}</p>
                  )}
                </div>
              </div>
              {/* Hint pinned to bottom */}
              <p className="text-xs text-muted-foreground/60 italic">Tap to learn more →</p>
            </>
          ) : (
            <>
              {member.photo ? (
                <div className="h-14 w-14 overflow-hidden rounded-full shrink-0">
                  <Media resource={member.photo} imgClassName="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="team-card-avatar h-14 w-14 text-base shrink-0">{initials}</div>
              )}
              <div className="min-w-0 text-left flex-1">
                <p className="font-bold text-foreground leading-tight">{name}</p>
                {member.role && (
                  <p className="text-sm mt-0.5 text-primary">{member.role}</p>
                )}
                <p className="mt-1 text-xs text-muted-foreground/60 italic">Tap to learn more →</p>
              </div>
            </>
          )}
        </button>

        {/* ── Back — plain div; social links + back button are siblings, not nested ── */}
        <div
          className={cn(
            'team-card-face team-card-back flex flex-col',
            isGrid ? 'items-center text-center' : 'items-start',
          )}
          aria-hidden={!flipped ? 'true' : 'false'}
        >
          <div className="team-card-accent" />

          <p className="font-bold text-foreground text-sm leading-tight">{name}</p>
          {member.role && <p className="team-role-back">{member.role}</p>}

          {member.bio ? (
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 overflow-auto">
              {member.bio}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground/50 italic flex-1">No bio available.</p>
          )}

          {member.socialLinks && member.socialLinks.length > 0 && (
            <div className={cn('mt-4 flex gap-3 flex-wrap', isGrid && 'justify-center')}>
              {member.socialLinks.map((link, j) => {
                const Icon = SocialIcon[link.platform ?? ''] ?? SocialIcon['website']!
                return (
                  <a
                    key={j}
                    href={link.url ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={socialLabel[link.platform ?? ''] ?? (link.platform ?? '')}
                    className="team-social-link"
                  >
                    {Icon && <Icon />}
                  </a>
                )
              })}
            </div>
          )}

          <button
            type="button"
            onClick={() => setFlipped(false)}
            className="mt-3 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors self-end italic cursor-pointer bg-transparent border-0 p-0"
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  )
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
        <div className="mb-10">
          {title && <h2 className="text-3xl font-bold text-brand-primary">{title}</h2>}
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div
        className={cn(
          layout === 'list'
            ? 'grid grid-cols-1 gap-6'
            : cn(
                'flex gap-4 overflow-x-auto pb-4 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                'sm:grid sm:gap-6 sm:overflow-x-visible sm:pb-0',
                columnClass[columns ?? '3'],
              ),
        )}
      >
        {members.map((member, i) => (
          <AnimateIn key={i} variant="fade-up" delay={Math.min(i, 4) * 150} className={layout !== 'list' ? 'shrink-0 w-[220px] sm:w-auto' : undefined}>
            <TeamMemberCard member={member} layout={layout ?? 'grid'} index={i} />
          </AnimateIn>
        ))}
      </div>
      {layout !== 'list' && <ScrollHint />}
    </div>
  )
}
