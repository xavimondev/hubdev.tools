import { createSupabaseServerClient } from '@/utils/supabase-server'

export const getUserPines = async () => {
  const supabaseServer = await createSupabaseServerClient()

  const { data, error } = await supabaseServer.rpc('get_user_pines')

  if (error) throw error

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
