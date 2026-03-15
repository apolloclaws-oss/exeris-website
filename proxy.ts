import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Login pagina altijd doorlaten
  if (pathname === '/dashboard/login') {
    return NextResponse.next({ request })
  }

  // Check of gebruiker een auth cookie heeft
  const hasSession = request.cookies.getAll().some(c =>
    c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
  )

  if (!hasSession) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url))
  }

  return NextResponse.next({ request })
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
