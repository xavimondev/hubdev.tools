'use server'

import { Resource } from '@/types/resource'

import { getPlaceholderImage } from '@/utils/generatePlaceholder'
import { getData, getResourcesByCategorySlug } from '@/services/list'

export const listResources = async ({
  from,
  to
}: {
  from: number
  to: number
}): Promise<Resource[] | undefined> => {
  const data = await getData({ from, to })
  if (!data) return

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

export const listResourcesBySlug = async ({
  from,
  to,
  slug
}: {
  from: number
  to: number
  slug: string
}) => {
  const data = await getResourcesByCategorySlug({ from, to, slug })
  if (!data) return

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
