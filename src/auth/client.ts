import { createSupabaseBrowserClient } from '@/utils/supabase-client'

export const signInWithGithub = async () => {
  const supabase = await createSupabaseBrowserClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/api/auth/callback`
    }
  })

  if (error) return null
  return data
}
