import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18nRouting>[0]) {
  const response = handleI18nRouting(request);
  if (response.status === 307) {
    const location = response.headers.get('location');
    if (location) {
      // Root "/" redirect depends on Accept-Language (fr default) →
      // must stay temporary and declare Vary so caches/crawlers don't pin one locale.
      if (request.nextUrl.pathname === '/') {
        const rootRedirect = NextResponse.redirect(location, { status: 307 });
        rootRedirect.headers.set('Vary', 'Accept-Language');
        return rootRedirect;
      }
      return NextResponse.redirect(location, { status: 308 });
    }
  }
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
