import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Auth check tijdelijk uitgeschakeld voor debugging
  return NextResponse.next({ request })
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
