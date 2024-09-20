import { Resource } from '@/types/resource'

import { getData, getResourcesByCategorySlug } from '@/services/list'

import { getCache, saveCache } from './cache'
import { getEmbeddings } from './embeddings'
import { getSummary } from './summary'

export type QueryData = {
  resources: Resource[] | undefined
  summary?: string
  language?: string
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

    const { summary, error: errorSummary, language } = await getSummary({ data, input: query })
    if (!summary || errorSummary) {
      return {
        error: errorSearch ?? '"An error occured. Please try again later."'
      }
    }

    // Let's save the query in the cache
    const cache = {
      input: query,
      data: {
        summary,
        resources: data
      },
      language
    }

    await saveCache({ cache })

    return {
      summary,
      resources: data,
      language
    }
  }

  const { data } = cache
  const { summary, resources } = data

  return {
    resources,
    summary
  }
}
