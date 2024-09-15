import { Suspense } from 'react'
import { ArrowRightCircleIcon } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { getLatestResources } from '@/services/dashboard'
import { ErrorState } from '@/components/error-state'
import { ListResource } from '@/components/list-resource'
import { LoadingCards } from '@/components/loading'

async function ListLatestResources() {
  const data = await getLatestResources()

  if (!data) {
    return <ErrorState error='Something went wrong' />
  }

  return <ListResource data={data} />
}

export function LatestResources() {
  return (
    <section>
      <div className='flex flex-col gap-2 mt-8'>
        <h2 className='text-2xl md:text-4xl text-balance mb-2 text-yellow-50'>The latest</h2>
        <div className='flex items-center justify-between'>
          <p className='text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-t from-gray-100 to-gray-400'>
            Check out the freshest resources right now.
          </p>
          <Link
            href='/category/all'
            className='text-sm text-anchor sm:flex hidden items-center hover:underline hover:underline-offset-2'
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
