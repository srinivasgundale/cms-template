'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { SearchIcon, MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Resolve CMS logo — data.logo is Media when depth >= 1
  const logoMedia = data?.logo && typeof data.logo === 'object' ? (data.logo as Media) : null

  return (
    <header
      className="sticky top-0 z-50 w-full bg-[#3C1500]"
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      {/* ── Main bar ── */}
      <div className="container flex h-16 items-center gap-4">

        {/* Logo — CMS image or text fallback */}
        <Link href="/" className="shrink-0 mr-4" aria-label="Home">
          {logoMedia?.url ? (
            <img
              src={logoMedia.url}
              alt={logoMedia.alt ?? 'Site logo'}
              className="h-10 w-auto object-contain"
              loading="eager"
            />
          ) : (
            <Logo />
          )}
        </Link>

        {/* Desktop nav — centered, hidden on mobile */}
        <div className="hidden md:flex flex-1 justify-center">
          <HeaderNav data={data} />
        </div>

        {/* Right-side icons */}
        <div className="flex items-center gap-1 ml-auto md:ml-0">
          {/* Search — always visible */}
          <Link
            href="/search"
            aria-label="Search"
            className="p-2 text-white/70 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            <SearchIcon className="w-5 h-5" />
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="p-2 md:hidden text-white/70 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            {mobileOpen ? (
              <XIcon className="w-5 h-5" />
            ) : (
              <MenuIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile slide-down panel — hidden on md+ ── */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden w-full border-t border-white/10 bg-[#3C1500] overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[32rem] py-2' : 'max-h-0 py-0',
        )}
        aria-live="polite"
      >
        <div className="container">
          <HeaderNav
            data={data}
            mobile
            onLinkClick={() => setMobileOpen(false)}
          />
        </div>
      </div>
    </header>
  )
}
