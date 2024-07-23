import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { prompt } = await req.json()

  try {
    const response = await fetch(
      `https://${process.env.SUPABASE_URL}/functions/v1/query-embedding`,
      {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          limit: 10
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    )

    console.log(response)

    return NextResponse.json({ data: ['cool'] })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
