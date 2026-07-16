import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Hind, Mukta, Noto_Sans_Devanagari, Tiro_Devanagari_Hindi } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { FloatingCTA } from '@/FloatingCTA/Component'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getLocale } from '@/utilities/getLocale'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// All Devanagari font options must be instantiated at module level (Next.js requirement).
// Only the CMS-selected font's class is applied to <html>, so only that font is preloaded.
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dev-noto',
  display: 'swap',
  preload: false,
})
const mukta = Mukta({
  subsets: ['devanagari'],
  weight: ['400', '500', '700'],
  variable: '--font-dev-mukta',
  display: 'swap',
  preload: false,
})
const hind = Hind({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dev-hind',
  display: 'swap',
  preload: false,
})
const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: '400',
  variable: '--font-dev-tiro',
  display: 'swap',
  preload: false,
})

const DEVANAGARI_FONTS = {
  'noto-sans-devanagari': { cls: notoSansDevanagari.variable, cssVar: '--font-dev-noto' },
  'mukta':                { cls: mukta.variable,              cssVar: '--font-dev-mukta' },
  'hind':                 { cls: hind.variable,               cssVar: '--font-dev-hind' },
  'tiro-devanagari':      { cls: tiroDevanagari.variable,     cssVar: '--font-dev-tiro' },
} as const

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const locale = await getLocale()

  let selectedFont: string | undefined
  try {
    const siteSettings = await getCachedGlobal('site-settings')()
    selectedFont = siteSettings?.devanagariFont ?? undefined
  } catch {
    // site-settings table may not exist yet (migration pending) — use default font
  }
  const { cls: devFontClass, cssVar: devFontCssVar } =
    DEVANAGARI_FONTS[selectedFont as keyof typeof DEVANAGARI_FONTS] ?? DEVANAGARI_FONTS['noto-sans-devanagari']

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, devFontClass)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        {/* Inject the CMS-selected Devanagari font as a CSS variable */}
        <style>{`:root { --font-devanagari: var(${devFontCssVar}); }`}</style>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <Providers locale={locale}>
          <ScrollProgress />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
          <FloatingCTA />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
