import { Suspense } from 'react'

import { getFavoritesResources } from '@/services/dashboard'
import { listFavorites } from '@/actions/favorites'

import { Container } from '@/components/container'
import { SpecialCard } from '@/components/special-card'
import { SectionHeader } from '@/components/section-header'
import { LoadingResources } from '@/components/loading'
import { NoFavorites } from '@/components/empty-state'

async function ListFavoritesComp() {
  const favoriteIds = await listFavorites()
  const favorites = favoriteIds.length > 0 ? await getFavoritesResources(favoriteIds) : []

  if (favorites.length === 0) {
    return <NoFavorites />
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
      {favorites.map((resource, index) => (
        <SpecialCard
          key={resource.id}
          resource={{
            id: resource.id,
            name: resource.title,
            category: resource.category,
            brief: resource.brief ?? resource.summary,
            url: resource.url,
            image: resource.image,
            placeholder: resource.placeholder ?? '',
            order: index,
            clicks: 0
          }}
          isFavorite={true}
        />
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <Container>
      <div className='h-auto w-full shrink-0 rounded-md'>
        <SectionHeader
          title='Favorite Resources'
          description='Explore all the resources you have marked as favorites.'
        />
        <Suspense fallback={<LoadingResources />}>
          <ListFavoritesComp />
        </Suspense>
      </div>
    </Container>
  )
}
