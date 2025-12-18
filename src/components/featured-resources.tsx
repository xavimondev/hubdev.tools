import { Suspense } from 'react'
import { InfoIcon } from 'lucide-react'

import { getFeaturedResourcesCached } from '@/services/cached-queries'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { LoadingResources } from '@/components/loading'
import { ListFeaturedResources } from '@/components/list-top-resources'

export async function FeaturedResources() {
  const featuredResources = await getFeaturedResourcesCached()

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
        <ListFeaturedResources data={featuredResources} />
      </Suspense>
    </section>
  )
}
