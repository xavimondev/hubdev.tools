import { revalidate } from '@/actions/revalidate'
import { toast } from 'sonner'

import { removePin } from '@/services/pins'

export function usePin() {
  const deletePin = async ({ id }: { id: string }) => {
    try {
      const response = await removePin({
        id
      })

      if (response === 'ok') {
        revalidate({
          key: '/favorites',
          type: 'path'
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return {
    deletePin
  }
}
