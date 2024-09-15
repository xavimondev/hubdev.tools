import { Resource } from '@/types/resource'

import { getPlaceholderImage } from '@/utils/generatePlaceholder'
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

const formatDataWithCategories = async ({
  resources
}: {
  resources: ResourcesWithCategories[]
}) => {
  const promises = resources.map(async (item) => {
    const { categories, ...resource } = item
    const { name } = categories ?? {}
    const blurDataURL = await getPlaceholderImage(resource.image)
    return {
      ...resource,
      category: name ?? '',
      blurDataURL
    }
  })
  const result = await Promise.all(promises)
  return result
}

const formatDataWithoutCategories = async ({ resources }: { resources: Resource[] }) => {
  const formattedResources = resources.map(async (resource) => {
    const blurDataURL = await getPlaceholderImage(resource.image)
    return {
      ...resource,
      blurDataURL
    }
  })
  const formattedData = await Promise.all(formattedResources)
  return formattedData
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

      data = await formatDataWithCategories({
        resources: result
      })
    } else {
      const result = await getResourcesByCategorySlug({ from: 0, to: 11, slug })
      if (!result) {
        return { error: 'An error occured. Please try again later.' }
      }

      data = await formatDataWithCategories({
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

    const resources = await formatDataWithoutCategories({
      resources: data
    })

    return {
      summary,
      resources,
      language
    }
  }

  const { data } = cache
  const { summary, resources } = data
  const formattedData = await formatDataWithoutCategories({
    resources
  })

  return {
    resources: formattedData,
    summary
  }
}
