import { createSupabaseServerClient } from '@/utils/supabase-server'

export const signOut = async () => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()
  return error
}
