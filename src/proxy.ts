import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from '@/content/dictionary';

/**
 * Every page lives under /ar or /en. Anything that arrives without a locale
 * prefix is redirected, preferring the visitor's own Accept-Language when it
 * asks for English — the audience is primarily Arabic-speaking, so Arabic
 * stays the default.
 */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const accepts = request.headers.get('accept-language') ?? '';
  const prefersEnglish = /\ben\b/i.test(accepts) && !/\bar\b/i.test(accepts);
  const locale = prefersEnglish ? 'en' : defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, the API surface and anything with a file extension.
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
