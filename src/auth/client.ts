import { createSupabaseBrowserClient } from '@/utils/supabase-client'

export const signInWithOAuth = async ({ provider }: { provider: 'github' | 'google' }) => {
  const supabase = await createSupabaseBrowserClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/api/auth/callback`
    }
  })

  if (error) return null
  return data
}
