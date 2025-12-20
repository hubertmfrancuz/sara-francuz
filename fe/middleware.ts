import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Set this to true to enable maintenance mode
const MAINTENANCE_MODE = false

export function middleware(request: NextRequest) {
  // Skip maintenance mode if disabled
  if (!MAINTENANCE_MODE) {
    return NextResponse.next()
  }

  // Allow access to maintenance page itself
  if (request.nextUrl.pathname === '/maintenance') {
    return NextResponse.next()
  }

  // Allow access to static files
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Redirect all other requests to maintenance page
  const maintenanceUrl = new URL('/maintenance', request.url)
  return NextResponse.redirect(maintenanceUrl)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
