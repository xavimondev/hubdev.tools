import { MAX_PINES, MAX_TOP_PINES } from '@/constants'
import { createSupabaseBrowserClient } from '@/utils/supabase-client'

type Pin = {
  resource_id: string
  user_id: string
}

export const addPin = async (pin: Pin) => {
  const supabase = await createSupabaseBrowserClient()
  const hasReachedLimit = await hasReachedMaxPins({ userId: pin.user_id })
  if (hasReachedLimit) {
    throw new Error(
      `You have reached your pin limit of ${MAX_PINES}. Please remove a pin before adding a new one.`
    )
  }

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
  action,
  userId
}: {
  pinId: string
  action: 'add' | 'remove'
  userId: string
}) => {
  const supabase = await createSupabaseBrowserClient()
  const isTop = action === 'add'

  if (isTop) {
    const hasReachedLimit = await hasReachedMaxTopPins({ userId })
    if (hasReachedLimit) {
      throw new Error(
        `You have reached your pin limit of ${MAX_TOP_PINES}. Please remove a pin before adding a new one.`
      )
    }
  }

  const { error } = await supabase.from('pines').update({ isTop }).eq('id', pinId)

  if (error) throw error

  return 'ok'
}

export const getTotalPinsByUser = async ({ userId }: { userId: string }) => {
  const supabase = await createSupabaseBrowserClient()

  const { error, count } = await supabase
    .from('pines')
    .select('id', {
      count: 'exact',
      head: true
    })
    .match({ user_id: userId })

  if (error) throw error
  return count
}

export const hasReachedMaxPins = async ({ userId }: { userId: string }) => {
  const count = (await getTotalPinsByUser({ userId })) ?? 0
  return count + 1 > MAX_PINES
}

export const getTotalTopPinsByUser = async ({ userId }: { userId: string }) => {
  const supabase = await createSupabaseBrowserClient()
  const { error, count } = await supabase
    .from('pines')
    .select('id', {
      count: 'exact',
      head: true
    })
    .match({ user_id: userId, isTop: true })

  if (error) throw error
  return count
}

export const hasReachedMaxTopPins = async ({ userId }: { userId: string }) => {
  const count = (await getTotalTopPinsByUser({ userId })) ?? 0
  return count + 1 > MAX_TOP_PINES
}
