import { unstable_cache } from 'next/cache'
import { QueryData } from '@supabase/supabase-js'

import { supabase } from './client'

const resourcesWithCategoryQuery = supabase.from('resources').select(`
    id, 
    title, 
    url, 
    image, 
    summary, 
    placeholder, 
    categories(
      name
    )
  `)

type ResourcesWithCategory = QueryData<typeof resourcesWithCategoryQuery>

export const getData = async ({ from, to }: { from: number; to: number }) => {
  return unstable_cache(
    async () => {
      const { data, error } = await resourcesWithCategoryQuery.range(from, to).order('title')
      if (error) {
        console.error(error)
        return
      }
      const resourcesWithCategory: ResourcesWithCategory = data
      return resourcesWithCategory
    },
    ['resources', `from_${from}_to${to}`],
    {
      revalidate: 3600
    }
  )()
}

export const getResourcesByCategorySlug = async ({
  from,
  to,
  slug
}: {
  from: number
  to: number
  slug: string
}) => {
  return unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from('resources')
        .select(
          `
    id, 
    title, 
    url, 
    image, 
    summary, 
    placeholder, 
    categories!inner(
      slug,
      name
    )
  `
        )
        .range(from, to)
        .order('title')
        .eq('categories.slug', slug)

      if (error) {
        console.error(error)
        return
      }

      return data
    },
    ['resources_slug', `${slug.toLowerCase()}:from_${from}_to${to}`],
    {
      revalidate: 3600
    }
  )()
}
