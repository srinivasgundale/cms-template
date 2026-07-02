import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'hi', 'mr'] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function extractLocaleFromPath(
  pathname: string,
): { locale: SupportedLocale; pathWithoutLocale: string } | null {
  for (const locale of SUPPORTED_LOCALES) {
    if (pathname === `/${locale}`) return { locale, pathWithoutLocale: '/' }
    if (pathname.startsWith(`/${locale}/`))
      return { locale, pathWithoutLocale: pathname.slice(locale.length + 1) }
  }
  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const match = extractLocaleFromPath(pathname)

  if (match) {
    // URL has locale prefix — rewrite internally to path without it
    const { locale, pathWithoutLocale } = match
    const rewriteUrl = request.nextUrl.clone()
    rewriteUrl.pathname = pathWithoutLocale

    // Forward x-locale as a REQUEST header so server components can read it via headers()
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', locale)

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    })
    // Persist choice in cookie for redirect fallback on future non-prefixed requests
    response.cookies.set('locale', locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
  }

  // No locale prefix — redirect to /{locale}{pathname}
  const cookieLocale = request.cookies.get('locale')?.value as SupportedLocale | undefined
  const locale: SupportedLocale =
    cookieLocale && (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)
      ? cookieLocale
      : 'en'

  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(redirectUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|admin|favicon\\.ico|.*\\..*).*)',],
}
