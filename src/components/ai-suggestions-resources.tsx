import { Suspense } from 'react'

import { getAISuggestions } from '@/services/dashboard'
import { listFavorites } from '@/actions/favorites'
import { ErrorState } from '@/components/error-state'
import { LoadingResources } from '@/components/loading'
import { SpecialCard } from '@/components/special-card'

async function ListAISuggestions() {
  const [aiSuggestions, favoriteIds] = await Promise.all([
    getAISuggestions(),
    listFavorites()
  ])
  const { data, error } = aiSuggestions

  if (error || !data) {
    return <ErrorState error='Something went wrong' />
  }

  if (data.length === 0) {
    return null
  }

  // Convert to Set for O(1) lookups instead of O(n) includes()
  const favoriteIdsSet = new Set(favoriteIds)

  return (
    <section>
      <div className='flex flex-col gap-2 mt-8'>
        <h2 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary'>
          AI Suggestions
        </h2>
        <p className='text-sm text-pretty max-w-lg text-muted-foreground'>
          Tailored recommendations powered by AI.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
        {data.map(({ id, title, url, image, brief, placeholder, category, summary }, index) => (
          <SpecialCard
            key={id}
            resource={{
              id,
              name: title,
              category,
              brief: brief ?? summary,
              url,
              image,
              placeholder: placeholder ?? '',
              order: index,
              clicks: 0
            }}
            isFavorite={favoriteIdsSet.has(id)}
          />
        ))}
      </div>
    </section>
  )
}

export function AISuggestionsResources() {
  return (
    <Suspense fallback={<LoadingResources />}>
      <ListAISuggestions />
    </Suspense>
  )
}
