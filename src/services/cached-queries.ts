import { unstable_cache } from 'next/cache'

import { getFeaturedResources, getLatestResources } from './dashboard'

export function getLatestResourcesCached() {
  return unstable_cache(
    async () => {
      return getLatestResources()
    },
    ['latest_resources'],
    {
      revalidate: 3600 * 24 // 1 day
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
      revalidate: 3600 * 24 // 1 day
    }
  )()
}
