import { createSupabaseServerClient } from '@/utils/supabase-server'

export const getUserPines = async () => {
  const supabaseServer = await createSupabaseServerClient()

  const { data, error } = await supabaseServer.rpc('get_user_pines')

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
      placeholder: pin.placeholder,
      category: pin.category,
      categoryColor: pin.category_color
    }
  })

  return formattedData
}

export const getTopPines = async ({ userId }: { userId: string }) => {
  const supabaseServer = await createSupabaseServerClient()
  const { data, error } = await supabaseServer
    .from('resources')
    .select(
      `
    resource_id:id,
    resource:title,
    url,
    summary,
    categories!inner(
      category:name,
      category_color:bg_color
    ),
    pines!inner(
      id
    )
    `
    )
    .match({ 'pines.user_id': userId, 'pines.isTop': true })

  if (error) {
    console.error(error)
    return
  }

  const formattedData = data.map((pin) => {
    const { resource_id, resource, url, summary, categories, pines } = pin

    const { category, category_color } = categories ?? {}
    const { id } = pines[0]

    return {
      id,
      resourceId: resource_id,
      name: resource,
      url: url,
      summary: summary,
      category: category,
      categoryColor: category_color as string
    }
  })

  return formattedData
}
