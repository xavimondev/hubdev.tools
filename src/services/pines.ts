import { createSupabaseBrowserClient } from '@/utils/supabase-client'

type Pin = {
  resource_id: string
  user_id: string
}

export const addPin = async (pin: Pin) => {
  const supabase = await createSupabaseBrowserClient()

  const { error } = await supabase.from('pines').insert(pin)

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
  const supabase = await createSupabaseBrowserClient()

  const { error } = await supabase.from('pines').delete().match({ resource_id, user_id })

  if (error) throw error

  return 'ok'
}

export const updateIsTopStatus = async ({
  pinId,
  action
}: {
  pinId: string
  action: 'add' | 'remove'
}) => {
  const supabase = await createSupabaseBrowserClient()
  const isTop = action === 'add'
  const { error } = await supabase.from('pines').update({ isTop }).eq('id', pinId)

  if (error) throw error

  return 'ok'
}
