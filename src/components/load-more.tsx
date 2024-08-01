'use client'

import { useRef } from 'react'
import { useParams } from 'next/navigation'
import { listResources, listResourcesBySlug } from '@/actions/resources/'
import { ArrowDownToLineIcon } from 'lucide-react'

import { Resource } from '@/types/resource'

import { NUMBER_OF_GENERATIONS_TO_FETCH } from '@/constants'
import { useAIStore } from '@/store'
import { Button } from '@/components/ui/button'

export function LoadMore() {
  const isLastRequest = useRef(false)
  const resources = useAIStore((state) => state.resources)
  const hasResources = useAIStore((state) => state.hasResources)
  const setHasResources = useAIStore((state) => state.setHasResources)
  const addResources = useAIStore((state) => state.addResources)
  const resourcesFirstFetch = useAIStore((state) => state.resourcesFirstFetch)
  const setResourcesFirstFetch = useAIStore((state) => state.setResourcesFirstFetch)
  const params = useParams<{ slug: string }>()

  // TODO: check when user is talking and displays some UI effects: use vad.
  const loadMoreResources = async () => {
    if (isLastRequest.current) return

    let data: any = []
    const resourcesLength = resources.length === 0 ? resourcesFirstFetch.length : resources.length
    const from = resourcesLength
    const to = resourcesLength + NUMBER_OF_GENERATIONS_TO_FETCH

    if (Object.keys(params).length === 0) {
      const results = await listResources({
        from,
        to
      })
      data = results
    } else {
      const slug = params.slug

      const results = await listResourcesBySlug({
        from,
        to,
        slug
      })
      data = results
    }
    if (!data) return

    if (data.length > 0) {
      const formatedData: Resource[] = data.map((item: any) => {
        const { categories, ...resource } = item
        const { name } = categories ?? {}
        return {
          ...resource,
          category: name ?? ''
        }
      })
      const moreResources = [...resourcesFirstFetch, ...formatedData]
      addResources(moreResources)
      if (resourcesFirstFetch.length > 0) {
        setResourcesFirstFetch([])
      }
    }

    // Hidding the load more button
    if (data.length < NUMBER_OF_GENERATIONS_TO_FETCH + 1) {
      isLastRequest.current = true
      setHasResources(false)
    }
  }

  return (
    <>
      {hasResources ? (
        <Button
          className='mt-2 rounded-full mx-auto flex justify-center'
          onClick={loadMoreResources}
        >
          <ArrowDownToLineIcon className='size-4 md:size-5 mr-2' />
          <span className='text-sm md:text-base'>Load more resources</span>
        </Button>
      ) : null}
    </>
  )
}
