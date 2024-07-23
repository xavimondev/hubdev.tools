import { QueryData } from '@supabase/supabase-js'

import { supabase } from './client'

const resourcesWithCategoryQuery = supabase.from('resources').select(`
    id, 
    slug, 
    title, 
    url, 
    description, 
    image, 
    summary, 
    categories(
      name
    )
  `)

type ResourcesWithCategory = QueryData<typeof resourcesWithCategoryQuery>

export const getData = async ({ from, to }: { from: number; to: number }) => {
  const { data, error } = await resourcesWithCategoryQuery.range(from, to).order('slug')

  if (error) {
    console.error(error)
    return
  }
  const resourcesWithCategory: ResourcesWithCategory = data
  return resourcesWithCategory
}
