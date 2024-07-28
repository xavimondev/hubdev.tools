'use server'

import { getData, getResourcesByCategorySlug } from '@/services/list'

export const listResources = async ({ from, to }: { from: number; to: number }) => {
  const data = await getData({ from, to })
  return data
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
  return data
}
