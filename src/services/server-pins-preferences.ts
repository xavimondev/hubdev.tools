import { createSupabaseServerClient } from '@/utils/supabase-server'

export const getPinsPreferences = async (): Promise<boolean> => {
  const supabase = await createSupabaseServerClient()
  const { error, data } = await supabase.from('preferences').select('id, isPinsVisible')

  if (error || data.length === 0) {
    return false
  }

  // @ts-ignore
  return data[0].isPinsVisible
}
