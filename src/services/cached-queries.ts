import { unstable_cache } from 'next/cache'

import { getFeaturedResources } from './dashboard'

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
