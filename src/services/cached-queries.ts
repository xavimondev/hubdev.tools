import { unstable_cache } from 'next/cache'

import { getFeaturedResources, getLatestResources } from './dashboard'
import { getData, getResourcesByCategorySlug } from './list'

export const getResourcesCached = async ({ from, to }: { from: number; to: number }) => {
  return unstable_cache(
    async () => {
      return getData({ from, to })
    },
    ['resources', `from_${from}_to${to}`],
    {
      revalidate: 3600
    }
  )()
}

export const getResourcesByCategoryCached = async ({
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
      return getResourcesByCategorySlug({ from, to, slug })
    },
    ['resources_slug', `${slug.toLowerCase()}:from_${from}_to${to}`],
    {
      revalidate: 3600
    }
  )()
}

export function getLatestResourcesCached() {
  return unstable_cache(
    async () => {
      return getLatestResources()
    },
    ['latest_resources'],
    {
      revalidate: 3600 * 12
    }
  )()
}

export function getFeaturedResourcesCached() {
  return unstable_cache(
    async () => {
      return getFeaturedResources()
    },
    ['featured_resources'],
    {
      revalidate: 3600
    }
  )()
}
