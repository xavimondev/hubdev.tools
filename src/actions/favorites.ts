'use server'

import { cookies } from 'next/headers'

const FAVORITES_COOKIE_NAME = 'favorites'
const MAX_FAVORITES = 100

export async function listFavorites(): Promise<string[]> {
  try {
    const cookieStore = await cookies()
    const favorites = cookieStore.get(FAVORITES_COOKIE_NAME)

    if (!favorites) {
      return []
    }

    const data = JSON.parse(favorites.value) as string[]
    return Array.isArray(data) ? data : []
  } catch (error) {
    return []
  }
}

export async function addFavorite(id: string): Promise<{ success: boolean; error?: string }> {
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

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'Something went wrong while adding the favorite.'
    }
  }
}

export async function removeFavorite(id: string): Promise<{ success: boolean; error?: string }> {
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

    return {
      success: true
    }
  } catch (error) {
    return {
      success: false,
      error: 'Something went wrong while removing the favorite.'
    }
  }
}
