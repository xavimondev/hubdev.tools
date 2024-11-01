import { getUser } from '@/auth/server'

import { Resource } from '@/types/resource'

import { getEmbeddings } from '@/services/embeddings'
import {
  getData,
  getResourcesBasedOnUser,
  getResourcesByCategorySlug,
  getResourcesByCategorySlugBasedOnUser
} from '@/services/list'
import { getCache, saveCache } from '@/services/redis-cache'

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
  const user = await getUser()

  if (query === 'all') {
    let data: Resource[] = []

    if (!slug || slug === 'all') {
      if (!user) {
        const result = await getData({ from: 0, to: 11 })

        if (!result) {
          return { error: 'An error occured. Please try again later.' }
        }

        data = formatDataWithCategories({
          resources: result
        })
      } else {
        const result = await getResourcesBasedOnUser({ page_number: 1, user_id: user.id })

        if (!result) {
          return { error: 'An error occured. Please try again later.' }
        }

        data = result
      }
    } else {
      if (!user) {
        const result = await getResourcesByCategorySlug({ from: 0, to: 11, slug })
        if (!result) {
          return { error: 'An error occured. Please try again later.' }
        }

        data = formatDataWithCategories({
          resources: result
        })
      } else {
        const result = await getResourcesByCategorySlugBasedOnUser({
          page_number: 1,
          slug,
          user_id: user.id
        })
        if (!result) {
          return { error: 'An error occured. Please try again later.' }
        }

        data = result
      }
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
