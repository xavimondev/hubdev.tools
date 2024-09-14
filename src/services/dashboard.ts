import { getPlaceholderImage } from '@/utils/generatePlaceholder'

import { supabase } from './client'

export const getFeaturedResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select(
      `
    id, 
    title, 
    url, 
    image, 
    summary, 
    categories!inner(
      slug,
      name
    )
  `
    )
    .order('clicks', { ascending: false })
    .limit(6)

  if (error) {
    console.error(error)
    return
  }

  const promises = data.map(async (item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    const blurDataURL = await getPlaceholderImage(resource.image)
    return {
      ...resource,
      category: name ?? '',
      blurDataURL
    }
  })
  const formatedData = await Promise.all(promises)
  return formatedData
}
