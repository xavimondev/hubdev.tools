import { createSupabaseBrowserClient } from '@/utils/supabase-client'

export const updatePreferences = async ({
  user_id,
  isPinVisible
}: {
  user_id: string
  isPinVisible: boolean
}) => {
  const supabase = await createSupabaseBrowserClient()
  const { error } = await supabase
    .from('preferences')
    .update({ isPinsVisible: isPinVisible })
    .eq('user_id', user_id)

  if (error) throw error

  return 'ok'
}
