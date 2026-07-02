'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useLocale } from '@/providers/Locale'
import type { SupportedLocale } from '@/utilities/getLocale'

const LOCALES: { code: SupportedLocale; label: string; fullLabel: string }[] = [
  { code: 'en', label: 'EN', fullLabel: 'English' },
  { code: 'hi', label: 'हि', fullLabel: 'हिंदी' },
  { code: 'mr', label: 'म', fullLabel: 'मराठी' },
]

const LOCALE_CODES: SupportedLocale[] = ['en', 'hi', 'mr']

function stripLocale(pathname: string): string {
  for (const locale of LOCALE_CODES) {
    if (pathname === `/${locale}`) return '/'
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1)
  }
  return pathname
}

export function LocaleToggle() {
  const { locale, setLocale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!

  const handleSelect = (code: SupportedLocale) => {
    setOpen(false)
    setLocale(code)
    const rest = stripLocale(pathname)
    // Full navigation needed: shared layout is cached by Next.js between soft navigations,
    // so router.push() alone won't re-render the locale providers or header/footer.
    window.location.href = `/${code}${rest === '/' ? '' : rest}`
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        suppressHydrationWarning
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${current.fullLabel}`}
        className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white/70 hover:text-white rounded transition-colors hover:bg-white/10"
      >
        {current.label}
        <svg
          className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1 min-w-[110px] rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black/10 dark:ring-white/10 overflow-hidden z-50"
        >
          {LOCALES.map(({ code, label, fullLabel }) => (
            <button
              key={code}
              type="button"
              role="menuitem"
              onClick={() => handleSelect(code)}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 transition-colors
                ${
                  locale === code
                    ? 'bg-black/5 dark:bg-white/10 font-semibold text-black dark:text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
            >
              <span className="w-5">{label}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{fullLabel}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
