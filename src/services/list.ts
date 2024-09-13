import { QueryData } from '@supabase/supabase-js'

import { getPlaceholderImage } from '@/utils/generatePlaceholder'

import { supabase } from './client'

const resourcesWithCategoryQuery = supabase.from('resources').select(`
    id, 
    title, 
    url, 
    image, 
    summary, 
    categories(
      name
    )
  `)

type ResourcesWithCategory = QueryData<typeof resourcesWithCategoryQuery>

export const getData = async ({ from, to }: { from: number; to: number }) => {
  const { data, error } = await resourcesWithCategoryQuery.range(from, to).order('title')
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
    .select('id, name, slug')
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

export const getLatestResources = async () => {
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
    .order('created_at', { ascending: false })
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
    .order('created_at', { ascending: false })
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
