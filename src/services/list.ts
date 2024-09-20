import { supabase } from './client'

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
