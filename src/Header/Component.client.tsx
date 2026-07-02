'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { ThemeToggle } from './ThemeToggle'
import { LocaleToggle } from '@/components/LocaleToggle'
import { SearchIcon, MenuIcon, XIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

function hexToRgba(color: string, alpha: number): string {
  const hex = color.startsWith('#') ? color : null
  if (!hex || hex.length < 7) return color
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bgColor = data.backgroundColor || '#3C1500'
  const logoMedia = data?.logo && typeof data.logo === 'object' ? (data.logo as Media) : null

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled && 'shadow-lg backdrop-blur-md',
      )}
      style={{
        backgroundColor: scrolled ? hexToRgba(bgColor, 0.88) : bgColor,
      }}
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      {/* ── Main bar ── */}
      <div className="container flex h-16 items-center gap-4">

        {/* Logo */}
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
          <Link
            href="/search"
            aria-label="Search"
            className="p-2 text-white/70 hover:text-white transition-colors rounded hover:bg-white/10"
          >
            <SearchIcon className="w-5 h-5" />
          </Link>

          {/* Language selector */}
          <LocaleToggle />

          {/* Dark / light mode toggle */}
          <ThemeToggle />

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

      {/* ── Mobile slide-down panel ── */}
      <div
        id="mobile-menu"
        className={cn(
          'md:hidden w-full border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out',
          mobileOpen ? 'max-h-[32rem] py-2' : 'max-h-0 py-0',
        )}
        style={{ backgroundColor: scrolled ? hexToRgba(bgColor, 0.95) : bgColor }}
        aria-live="polite"
      >
        <div className="container">
          <HeaderNav data={data} mobile onLinkClick={() => setMobileOpen(false)} />
        </div>
      </div>
    </header>
  )
}
