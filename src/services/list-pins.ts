import { createSupabaseServerClient } from '@/utils/supabase-server'

export const getUserPins = async ({
  userId,
  from,
  to
}: {
  userId: string
  from: number
  to: number
}) => {
  const supabaseServer = await createSupabaseServerClient()

  const { data, error } = await supabaseServer
    .from('pines')
    .select(
      `
    id,
    ...resources!inner(
      resource_id:id,
      resource:title,
      url,
      image,
      summary,
      placeholder,
      ...categories!inner(
        category:name,
        category_color:bg_color
      )
    )
    `
    )
    .match({ user_id: userId, isTop: false })
    .range(from, to)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const formattedData = data.map((pin) => {
    return {
      id: pin.id,
      resourceId: pin.resource_id,
      name: pin.resource,
      url: pin.url,
      image: pin.image,
      summary: pin.summary,
      placeholder: pin.placeholder as string,
      category: pin.category,
      categoryColor: pin.category_color as string
    }
  })

  return formattedData
}

export const getTopPins = async ({ userId }: { userId: string }) => {
  const supabaseServer = await createSupabaseServerClient()
  const { data, error } = await supabaseServer
    .from('pines')
    .select(
      `
    id,
    ...resources!inner(
      resource_id:id,
      resource:title,
      url,
      summary,
      ...categories!inner(
        category:name,
        category_color:bg_color
      )
    )
    `
    )
    .match({ user_id: userId, isTop: true })
    .order('updated_at', { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const formattedData = data.map((pin) => {
    return {
      id: pin.id,
      resourceId: pin.resource_id,
      name: pin.resource,
      url: pin.url,
      summary: pin.summary,
      category: pin.category,
      categoryColor: pin.category_color as string
    }
  })

  return formattedData
}

export const getPinsIdsByUser = async ({ userId }: { userId: string }) => {
  const supabaseServer = await createSupabaseServerClient()

  const { data, error } = await supabaseServer
    .from('pines')
    .select('resource_id')
    .eq('user_id', userId)

  if (error) {
    console.error(error)
    return
  }

  return data
}