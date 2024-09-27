'use server'

import { Resource } from '@/types/resource'

import { getResourcesByCategoryCached, getResourcesCached } from '@/services/cached-queries'

export const listResources = async ({
  from,
  to
}: {
  from: number
  to: number
}): Promise<Resource[] | undefined> => {
  const data = await getResourcesCached({ from, to })
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
  const data = await getResourcesByCategoryCached({ from, to, slug })
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
