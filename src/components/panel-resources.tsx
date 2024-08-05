'use client'

import { useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { listResources, listResourcesBySlug } from '@/actions/resources'

import { Resource } from '@/types/resource'

import { NUMBER_OF_GENERATIONS_TO_FETCH } from '@/constants'
import { ListResource } from '@/components/list-resource'
import { LoadMore } from '@/components/load-more'

export function PanelResources({ resources }: { resources: Resource[] }) {
  const isLastRequest = useRef(false)
  const [data, setData] = useState<Resource[]>(resources)
  const [hasResources, setHasResources] = useState(
    resources.length > NUMBER_OF_GENERATIONS_TO_FETCH
  )
  const params = useParams<{ slug: string }>()

  const loadMoreResources = async () => {
    if (isLastRequest.current || !data) return

    let results: any = []
    const from = data.length
    const to = data.length + NUMBER_OF_GENERATIONS_TO_FETCH

    if (Object.keys(params).length === 0) {
      results = await listResources({
        from,
        to
      })
    } else {
      const slug = params.slug
      results = await listResourcesBySlug({
        from,
        to,
        slug
      })
    }

    if (!results) return

    if (results.length > 0) {
      const formatedData: Resource[] = results.map((item: any) => {
        const { categories, ...resource } = item
        const { name } = categories ?? {}
        return {
          ...resource,
          category: name ?? ''
        }
      })
      setData((prevData) => prevData.concat(formatedData))
    }

    // Hidding the load more button
    if (results.length < NUMBER_OF_GENERATIONS_TO_FETCH + 1) {
      isLastRequest.current = true
      setHasResources(false)
    }
  }

  return (
    <>
      <ListResource data={data} />
      {hasResources && <LoadMore loadMoreResources={loadMoreResources} />}
    </>
  )
}
