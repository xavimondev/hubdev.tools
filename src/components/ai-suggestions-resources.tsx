import { Suspense } from 'react'
import { getUser } from '@/auth/server'

import { getAISuggestions } from '@/services/dashboard'
import { getPinsIdsByUser } from '@/services/list-pins'
import { ErrorState } from '@/components/error-state'
import { ListResource } from '@/components/list-resource'
import { LoadingCards } from '@/components/loading'

async function ListAISuggestions() {
  const aiSuggestions = await getAISuggestions()

  const { data, error } = aiSuggestions

  if (error || !data) {
    return <ErrorState error='Something went wrong' />
  }

  if (data.length === 0) {
    return null
  }

  // Let's remove resources already pinned from the suggestions
  const user = await getUser()
  const { id } = user ?? {}

  const pinIds = !id
    ? []
    : ((
        await getPinsIdsByUser({
          userId: id
        })
      )?.map((pin) => pin.resource_id) ?? [])

  const suggestions = data.filter((suggestion) => !pinIds.includes(suggestion.id))

  return (
    <section>
      <div className='flex flex-col gap-4 mt-8'>
        <h2 className='text-2xl md:text-4xl text-balance mb-2 text-yellow-800 dark:text-yellow-50 font-bold'>
          AI Suggestions
        </h2>
        <p className='text-base md:text-lg text-transparent bg-clip-text bg-linear-to-t from-gray-600 to-gray-800 dark:from-cyan-100 dark:to-cyan-400'>
          Tailored recommendations powered by AI.
        </p>
      </div>
      <ListResource data={suggestions} />
    </section>
  )
}

export function AISuggestionsResources() {
  return (
    <Suspense fallback={<LoadingCards />}>
      <ListAISuggestions />
    </Suspense>
  )
}
