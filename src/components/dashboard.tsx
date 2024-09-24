import { AISuggestionsResources } from '@/components/ai-suggestions-resources'
import { FeaturedResources } from '@/components/featured-resources'
import { LatestResources } from '@/components/latest-resources'

export function Dashboard() {
  return (
    <>
      <FeaturedResources />
      <AISuggestionsResources />
      <LatestResources />
    </>
  )
}
