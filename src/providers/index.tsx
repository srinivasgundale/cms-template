import React from 'react'

import { LocaleProvider } from './Locale'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import type { SupportedLocale } from '@/utilities/getLocale'

export const Providers: React.FC<{
  children: React.ReactNode
  locale?: SupportedLocale
}> = ({ children, locale = 'en' }) => {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </LocaleProvider>
  )
}
