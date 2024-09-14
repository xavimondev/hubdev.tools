import { NextResponse, type NextRequest } from 'next/server'

import { updateClicks } from '@/services/updateClicks'

export async function middleware(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const resourceLink = searchParams.get('ref')

  if (!resourceLink) {
    return NextResponse.next()
  }

  const { message, success, code } = await updateClicks({ url: resourceLink })
  if (!success) {
    return NextResponse.json({ error: message }, { status: code })
  }

  return NextResponse.redirect(new URL(resourceLink, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}
