import { NextResponse, type NextRequest } from 'next/server'

import { updateSession } from '@/utils/supabase-middleware'
import { updateClicks } from '@/services/updateClicks'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/pins') {
    const supabaseResponse = await updateSession(request)
    return supabaseResponse
  }

  const searchParams = request.nextUrl.searchParams
  const resourceLink = searchParams.get('ref')

  if (!resourceLink) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('X-Pathname', request.nextUrl.pathname)

    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }

  if (process.env.NODE_ENV === 'production') {
    const { message, success, code } = await updateClicks({
      url: resourceLink
    })
    if (!success) {
      return NextResponse.json(
        {
          error: message
        },
        {
          status: code
        }
      )
    }
  }

  return NextResponse.redirect(new URL(resourceLink, request.url))
}

export const config = {
  matcher: ['/((?!api|category|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}
