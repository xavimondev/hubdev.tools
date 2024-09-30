'use server'

import { Resource } from '@/types/resource'

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

  const formattedData = data.map((item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    return {
      ...resource,
      category: name ?? ''
    }
  })

  return formattedData
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

  const formattedData = data.map((item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    return {
      ...resource,
      category: name ?? ''
    }
  })

  return formattedData
}
