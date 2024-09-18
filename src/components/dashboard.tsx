import { Suspense } from 'react'

import { AISuggestionsResources } from '@/components/ai-suggestions-resources'
import { FeaturedResources } from '@/components/featured-resources'
import { LatestResources } from '@/components/latest-resources'
import { LoadingCards } from '@/components/loading'

export function Dashboard() {
  return (
    <>
      <FeaturedResources />
      <Suspense fallback={<LoadingCards />}>
        <AISuggestionsResources />
      </Suspense>
      <LatestResources />
    </>
  )
}
