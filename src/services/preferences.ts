import { Preferences } from '@/types/preferences'

import { createSupabaseBrowserClient } from '@/utils/supabase-client'

export const getPreferences = async () => {
  const supabase = await createSupabaseBrowserClient()
  const { error, data } = await supabase.from('preferences').select('id')

  if (error) throw error

  return data[0]
}

export const updatePreferences = async (preferences: Preferences) => {
  const supabase = await createSupabaseBrowserClient()
  const { error, data } = await supabase.from('preferences').upsert(preferences)

  if (error) throw error

  return data
}
