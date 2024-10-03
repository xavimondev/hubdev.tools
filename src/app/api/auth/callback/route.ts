import { NextResponse } from 'next/server'

import { createSupabaseServerClient } from '@/utils/supabase-server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/pinned'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // TODO: return the user to an error page(auth-code-error) with instructions
  return NextResponse.redirect(`${origin}/`)
}
