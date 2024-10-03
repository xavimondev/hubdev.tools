import { NextRequest, NextResponse } from 'next/server'
import { type EmailOtpType } from '@supabase/supabase-js'

import { createSupabaseServerClient } from '@/utils/supabase-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = searchParams.get('next') ?? '/pinned'
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next

  if (token_hash && type) {
    const supabase = await createSupabaseServerClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash
    })
    if (!error) {
      return NextResponse.redirect(redirectTo)
    }
  }
  // TODO: return the user to an error page(auth-code-error) with instructions
  redirectTo.pathname = `${origin}/`
  return NextResponse.redirect(redirectTo)
}
