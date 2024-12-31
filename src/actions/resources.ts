'use server'

import { getUser } from '@/auth/server'

import { Resource } from '@/types/resource'

import { NUMBER_OF_GENERATIONS_TO_FETCH } from '@/constants'
import {
  getData,
  getResourcesBasedOnUser,
  getResourcesByCategorySlug,
  getResourcesByCategorySlugBasedOnUser
} from '@/services/list'

export const listResources = async ({
  from,
  to
}: {
  from: number
  to: number
}): Promise<Resource[] | undefined> => {
  const user = await getUser()
  if (!user) {
    const data = await getData({ from, to })

    if (!data) return

    const formattedData = data.map((item) => {
      const { categories, ...resource } = item
      const { name } = categories ?? {}
      return {
        ...resource,
        category: name ?? ''
      }
    })
    return formattedData
  }

  const pageNumber = Math.floor(to / NUMBER_OF_GENERATIONS_TO_FETCH)

  const data = await getResourcesBasedOnUser({
    page_number: pageNumber,
    user_id: user.id
  })

  return data
}

export const listResourcesBySlug = async ({
  from,
  to,
  slug
}: {
  from: number
  to: number
  slug: string
}) => {
  const user = await getUser()

  if (!user) {
    const data = await getResourcesByCategorySlug({ from, to, slug })
    if (!data) return
    const formattedData = data.map((item) => {
      const { categories, ...resource } = item
      const { name } = categories ?? {}
      return {
        ...resource,
        category: name ?? ''
      }
    })

    return formattedData
  }

  const pageNumber = Math.floor(to / NUMBER_OF_GENERATIONS_TO_FETCH)

  const data = await getResourcesByCategorySlugBasedOnUser({
    page_number: pageNumber,
    slug,
    user_id: user.id
  })

  if (!data) return

  return data
}
