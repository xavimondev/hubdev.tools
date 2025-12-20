import { Suspense } from 'react'
import { InfoIcon } from 'lucide-react'

import { getFeaturedResourcesCached } from '@/services/cached-queries'
import { listFavorites } from '@/actions/favorites'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LoadingResources } from '@/components/loading'
import { ErrorState } from '@/components/error-state'
import { SpecialCard } from '@/components/special-card'

export async function ListFeaturedResources() {
  const data = await getFeaturedResourcesCached()
  const favoriteIds = await listFavorites()

  if (!data) {
    return <ErrorState error='Something went wrong' />
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 py-6'>
      {data.map(({ id, title, url, image, brief, placeholder, clicks, category }, index) => (
        <SpecialCard
          key={id}
          resource={{
            id,
            name: title,
            category,
            brief: brief ?? '',
            url,
            image,
            placeholder: placeholder ?? '',
            order: index,
            clicks
          }}
          isFavorite={favoriteIds.includes(id)}
        />
      ))}
    </div>
  )
}

export function FeaturedResources() {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h2 className='text-2xl text-balance font-semibold text-light-800 dark:text-primary'>
            Featured
          </h2>
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='text-muted-foreground hover:text-foreground transition-colors'>
                  <InfoIcon className='size-3' />
                  <span className='sr-only'>Information about featured resources</span>
                </button>
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='max-w-[220px] text-center'
              >
                <p>Updated hourly based on community engagement</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className='text-sm text-pretty max-w-lg text-muted-foreground'>
          Discover the most popular resources.
        </p>
      </div>
      <Suspense fallback={<LoadingResources />}>
        <ListFeaturedResources />
      </Suspense>
    </section>
  )
}
