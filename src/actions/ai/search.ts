import { Resource } from '@/types/resource'

import { getData, getResourcesByCategorySlug } from '@/services/cached-queries'

import { getCache, saveCache } from './cache'
import { getEmbeddings } from './embeddings'

export type QueryData = {
  resources: Resource[] | undefined
}

type ResourcesWithCategories = {
  id: string
  title: string
  url: string
  image: string
  summary: string
  placeholder: string | null
  categories:
    | {
        name: string
      }
    | {
        slug: string | null
        name: string
      }
    | null
}

const formatDataWithCategories = ({ resources }: { resources: ResourcesWithCategories[] }) => {
  return resources.map((item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    return {
      ...resource,
      category: name ?? ''
    }
  })
}

export async function search({
  q,
  slug
}: {
  q?: string
  slug?: string
}): Promise<QueryData | { error: string }> {
  const query = q ?? 'all'

  if (query === 'all') {
    let data: Resource[] = []

    if (!slug || slug === 'all') {
      const result = await getData({ from: 0, to: 11 })
      if (!result) {
        return { error: 'An error occured. Please try again later.' }
      }

      data = formatDataWithCategories({
        resources: result
      })
    } else {
      const result = await getResourcesByCategorySlug({ from: 0, to: 11, slug })
      if (!result) {
        return { error: 'An error occured. Please try again later.' }
      }

      data = formatDataWithCategories({
        resources: result
      })
    }
    return {
      resources: data
    }
  }

  const cache = await getCache({ input: query })
  if (!cache) {
    const { data, error: errorSearch } = await getEmbeddings({ input: query })
    if (errorSearch || !data || data.length === 0) {
      return {
        resources: [],
        error: errorSearch
      }
    }

    // Let's save the query in the cache
    const cache = {
      input: query,
      data: {
        resources: data
      }
    }

    await saveCache({ cache })

    return {
      resources: data
    }
  }

  const { data } = cache
  const { resources } = data

  return {
    resources
  }
}
