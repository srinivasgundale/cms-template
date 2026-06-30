import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType, Media } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const navItems = footerData?.navItems || []
  const logoMedia = footerData?.logo && typeof footerData.logo === 'object'
    ? (footerData.logo as Media)
    : null

  return (
    <footer
      className="mt-auto border-t border-border text-white"
      style={{ backgroundColor: footerData?.backgroundColor || '#000000' }}
    >
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          {logoMedia?.url ? (
            <img
              src={logoMedia.url}
              alt={logoMedia.alt ?? 'Site logo'}
              className="h-10 w-auto object-contain"
              loading="lazy"
            />
          ) : (
            <Logo />
          )}
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
