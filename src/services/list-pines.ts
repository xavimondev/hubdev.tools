import { createSupabaseServerClient } from '@/utils/supabase-server'

export const getUserPines = async () => {
  const supabaseServer = await createSupabaseServerClient()

  const { data, error } = await supabaseServer.rpc('get_user_pines')

  if (error) throw error

  return data
}
