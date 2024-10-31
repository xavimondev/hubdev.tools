import { createSupabaseBrowserClient } from '@/utils/supabase-client'

export const updatePreferences = async ({
  user_id,
  isPinsVisible
}: {
  user_id: string
  isPinsVisible: boolean
}) => {
  const supabase = await createSupabaseBrowserClient()
  const { error } = await supabase
    .from('preferences')
    .update({ isPinsVisible })
    .eq('user_id', user_id)

  if (error) throw error

  return 'ok'
}
