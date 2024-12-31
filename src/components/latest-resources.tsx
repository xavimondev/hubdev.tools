import { Suspense } from 'react'
import { getUser } from '@/auth/server'
import { ArrowRightCircleIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { getLatestResourcesCached } from '@/services/cached-queries'
import { getPinsIdsByUser } from '@/services/list-pins'
import { ErrorState } from '@/components/error-state'
import { ListResource } from '@/components/list-resource'
import { LoadingCards } from '@/components/loading'

async function ListLatestResources() {
  const data = await getLatestResourcesCached()

  if (!data) {
    return <ErrorState error='Something went wrong' />
  }

  // Let's remove resources already pinned
  const user = await getUser()
  const { id } = user ?? {}

  const pinIds = !id
    ? []
    : ((await getPinsIdsByUser({ userId: id }))?.map((pin) => pin.resource_id) ?? [])

  const resources = data.filter((suggestion) => !pinIds.includes(suggestion.id))

  return <ListResource data={resources} />
}

export function LatestResources() {
  return (
    <section>
      <div className='flex flex-col gap-4 mt-8'>
        <h2 className='text-2xl md:text-4xl text-balance text-yellow-800 dark:text-yellow-50 font-bold'>
          The latest
        </h2>
        <div className='flex items-center justify-between'>
          <p className='text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-t from-gray-600 to-gray-800 dark:from-gray-100 dark:to-gray-400'>
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
      <Suspense fallback={<LoadingCards />}>
        <ListLatestResources />
      </Suspense>
    </section>
  )
}
