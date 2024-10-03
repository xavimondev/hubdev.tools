import { createSupabaseBrowserClient } from '@/utils/supabase-client'

type Pin = {
  resource_id: string
  user_id: string
}

export const addPin = async (pin: Pin) => {
  const supabaseServer = await createSupabaseBrowserClient()

  const { error } = await supabaseServer.from('pines').insert(pin)

  if (error) throw error

  return 'ok'
}

export const removePin = async ({
  resource_id,
  user_id
}: {
  resource_id: string
  user_id: string
}) => {
  const supabaseServer = await createSupabaseBrowserClient()

  const { error } = await supabaseServer.from('pines').delete().match({ resource_id, user_id })

  if (error) throw error

  return 'ok'
}
