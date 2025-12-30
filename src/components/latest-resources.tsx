import { Suspense } from 'react'
import { ArrowRightCircleIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { getLatestResources } from '@/services/dashboard'
import { listFavorites } from '@/actions/favorites'
import { ErrorState } from '@/components/error-state'
import { LoadingResources } from '@/components/loading'
import { SpecialCard } from '@/components/special-card'

async function ListLatestResources() {
  const data = await getLatestResources()
  const favoriteIds = await listFavorites()

  if (!data) {
    return <ErrorState error='Something went wrong' />
  }

  return (
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
          isFavorite={favoriteIds.includes(id)}
        />
      ))}
    </div>
  )
}

export function LatestResources() {
  return (
    <section>
      <div className='flex flex-col gap-2 mt-8'>
        <h2 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary'>
          The latest
        </h2>
        <div className='flex items-center justify-between'>
          <p className='text-sm text-pretty max-w-lg text-muted-foreground'>
            Check out the freshest resources right now.
          </p>
          <Link
            href='/category/all'
            className='text-sm text-blue-700 dark:text-anchor sm:flex hidden items-center hover:underline hover:underline-offset-2'
          >
            See all
            <ArrowRightCircleIcon className='size-4 ml-2' />
          </Link>
        </div>
      </div>
      <Suspense fallback={<LoadingResources />}>
        <ListLatestResources />
      </Suspense>
    </section>
  )
}
