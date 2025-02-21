import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json()
  const input = data.input

  try {
    const cookieStore = await cookies()
    const history = cookieStore.get('history')
    if (!history) {
      cookieStore.set('history', JSON.stringify([input]), { secure: true })
      return NextResponse.json({ msg: 'History updated successfully' })
    }

    // max length of history is 5
    const data = JSON.parse(history.value) as string[]
    if (data.length === 5) {
      data.shift()
    }

    if (!data.includes(input)) {
      const newHistory = [input, ...data] as any
      ;(await cookies()).set('history', JSON.stringify(newHistory), { secure: true })
    }

    return NextResponse.json({ msg: 'History updated successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while updating the history.' })
  }
}
