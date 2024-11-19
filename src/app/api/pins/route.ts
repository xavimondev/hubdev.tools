import { NextResponse, type NextRequest } from 'next/server'
import { getUser } from '@/auth/server'

import { getUserPins } from '@/services/list-pins'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const from = Number(searchParams.get('from') ?? '0')
  const to = Number(searchParams.get('to') ?? '0')

  const user = await getUser()

  if (!user) {
    return new Response(JSON.stringify({ msg: 'Unauthorized' }), {
      status: 401
    })
  }

  const data = await getUserPins({ userId: user.id, from, to })

  return NextResponse.json({ data })
}
