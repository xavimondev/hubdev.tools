'use server'

import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'

import { favoritesRateLimit } from '@/ratelimit'

const FAVORITES_COOKIE_NAME = 'favorites'
const MAX_FAVORITES = 50

async function checkRateLimit(): Promise<boolean> {
  try {
    if (process.env.NODE_ENV === 'production') {
      if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        const ip = (await headers()).get('x-forwarded-for') ?? 'local'
        const { success } = await favoritesRateLimit.limit(ip)
        return success
      }
    }
    return true
  } catch {
    return true
  }
}

export async function listFavorites(): Promise<string[]> {
  try {
    const cookieStore = await cookies()
    const favorites = cookieStore.get(FAVORITES_COOKIE_NAME)

    if (!favorites) {
      return []
    }

    const data = JSON.parse(favorites.value) as string[]
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export async function addFavorite(
  id: string,
  pathname: string
): Promise<{ success: boolean; error?: string }> {
  const rateLimitPassed = await checkRateLimit()
  if (!rateLimitPassed) {
    return {
      success: false,
      error: 'Too many requests. Please try again in a minute.'
    }
  }

  try {
    const cookieStore = await cookies()
    const favorites = cookieStore.get(FAVORITES_COOKIE_NAME)

    let favoriteIds: string[] = []

    if (favorites) {
      favoriteIds = JSON.parse(favorites.value) as string[]
      if (!Array.isArray(favoriteIds)) {
        favoriteIds = []
      }
    }

    // check if the favorite is already in the list
    if (favoriteIds.includes(id)) {
      return {
        success: true
      }
    }

    // Make sure the favorite list is not longer than the maximum allowed
    if (favoriteIds.length >= MAX_FAVORITES) {
      return {
        success: false,
        error: `You have reached the maximum number of favorites`
      }
    }

    // Add the new favorite
    const newFavorites = [...favoriteIds, id]

    cookieStore.set(FAVORITES_COOKIE_NAME, JSON.stringify(newFavorites), {
      secure: true
    })

    revalidatePath(pathname)

    return {
      success: true
    }
  } catch {
    return {
      success: false,
      error: 'Something went wrong while adding the favorite.'
    }
  }
}

export async function removeFavorite(
  id: string,
  pathname: string
): Promise<{ success: boolean; error?: string }> {
  const rateLimitPassed = await checkRateLimit()
  if (!rateLimitPassed) {
    return {
      success: false,
      error: 'Too many requests. Please try again in a minute.'
    }
  }

  try {
    const cookieStore = await cookies()
    const favorites = cookieStore.get(FAVORITES_COOKIE_NAME)

    if (!favorites) {
      return {
        success: true
      }
    }

    const favoriteIds = JSON.parse(favorites.value) as string[]
    const newFavorites = favoriteIds.filter((favoriteId) => favoriteId !== id)

    cookieStore.set(FAVORITES_COOKIE_NAME, JSON.stringify(newFavorites), {
      secure: true
    })

    revalidatePath(pathname)

    return {
      success: true
    }
  } catch {
    return {
      success: false,
      error: 'Something went wrong while removing the favorite.'
    }
  }
}
