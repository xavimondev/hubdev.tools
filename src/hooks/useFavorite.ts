import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'

import { addFavorite, removeFavorite } from '@/actions/favorites'

export function useFavorite(isFavorite: boolean, id: string) {
  const [isFav, setIsFav] = useState(isFavorite)
  const pathname = usePathname()

  async function handleToggleFavorite() {
    if (isFav) {
      const result = await removeFavorite(id, pathname)
      if (result.error) {
        toast.error(result.error)
        return
      }

      setIsFav(false)
    } else {
      const result = await addFavorite(id, pathname)
      if (result.error) {
        toast.error(result.error)
        return
      }

      setIsFav(true)
    }
  }

  return {
    isFav,
    handleToggleFavorite
  }
}
