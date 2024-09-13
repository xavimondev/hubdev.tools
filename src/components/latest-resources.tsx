import { Suspense } from 'react'

import { getLatestResources } from '@/services/list'
import { ErrorState } from '@/components/error-state'
import { LoadingCards } from '@/components/loading'

async function ListLatestResources() {
  const data = await getLatestResources()

  if (!data) {
    return <ErrorState error='Something went wrong' />
  }
}

export function LatestResources() {
  return (
    <section>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl md:text-4xl text-balance mb-2 text-yellow-50'>The latest</h2>
        <p className='text-base md:text-xl text-transparent bg-clip-text bg-gradient-to-t from-gray-100 to-gray-400'>
          Check out the freshest resources right now.
        </p>
      </div>
      <Suspense fallback={<LoadingCards />}>
        <ListLatestResources />
      </Suspense>
    </section>
  )
}
