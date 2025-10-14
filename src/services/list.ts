import { QueryData } from '@supabase/supabase-js'

import { ROWS_PER_PAGE } from '@/constants'

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
  const { data, error } = await resourcesWithCategoryQuery.range(from, to).order('created_at', {
    ascending: false
  })
  if (error) {
    console.error(error)
    return
  }
  const resourcesWithCategory: ResourcesWithCategory = data
  return resourcesWithCategory
}

export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug, emoji')
    .eq('isActive', true)
    .order('name')

  if (error) {
    console.error(error)
    return
  }

  return data
}

export const getCategoryDetails = async ({ slug }: { slug: string }) => {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, description')
    .eq('slug', slug)

  if (error) {
    console.error(error)
    return
  }

  return data
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
}

export const getResourcesBasedOnUser = async ({
  page_number,
  user_id
}: {
  page_number: number
  user_id: string
}) => {
  const { data, error } = await supabase.rpc('get_user_resources', {
    rows_per_page: ROWS_PER_PAGE,
    page_number,
    u_id: user_id
  })

  if (error) {
    console.error(error)
    return
  }

  return data
}

export const getResourcesByCategorySlugBasedOnUser = async ({
  page_number,
  slug,
  user_id
}: {
  page_number: number
  slug: string
  user_id: string
}) => {
  const { data, error } = await supabase.rpc('get_user_resources_by_slug', {
    rows_per_page: ROWS_PER_PAGE,
    page_number,
    cat_slug: slug,
    u_id: user_id
  })

  if (error) {
    console.error(error)
    return
  }

  return data
}
