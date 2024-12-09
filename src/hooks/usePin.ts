import { revalidate } from '@/actions/revalidate'
import { toast } from 'sonner'

import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { removePin, updateIsTopStatus } from '@/services/pins'

export function usePin() {
  const deletePin = async ({ resourceId }: { resourceId: string }) => {
    try {
      const supabase = await createSupabaseBrowserClient()
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        toast.warning('You need to be logged in to pin a resource.')
        return
      }

      const { id } = user
      const response = await removePin({
        resource_id: resourceId,
        user_id: id
      })

      if (response === 'ok') {
        await revalidate()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  const updatePinStatus = async ({ id, action }: { id: string; action: 'add' | 'remove' }) => {
    try {
      const supabase = await createSupabaseBrowserClient()

      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        toast.warning('You need to be logged in to pin a resource.')
        return
      }

      const { id: userId } = user

      const response = await updateIsTopStatus({ pinId: id, action, userId })
      if (response === 'ok') {
        toast.success('Pin Updated', {
          duration: 2000
        })

        // TODO: improve this, maybe move supabase operations to server
        await revalidate()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return {
    deletePin,
    updatePinStatus
  }
}
