import { revalidate } from '@/actions/revalidate'
import { toast } from 'sonner'

import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { removePin, updateIsTopStatus } from '@/services/pines'

export function usePin() {
  const deletePin = async ({ resourceId }: { resourceId: string }) => {
    try {
      const supabase = await createSupabaseBrowserClient()
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) {
        toast.error('You need to be logged in to pin a resource.')
        return
      }

      const { id } = user
      const response = await removePin({
        resource_id: resourceId,
        user_id: id
      })

      if (response === 'ok') {
        toast('🗑️ Pin removed successfully', {
          duration: 1000
        })

        await revalidate()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  const updatePinStatus = async ({ id, action }: { id: string; action: 'add' | 'remove' }) => {
    try {
      const response = await updateIsTopStatus({ pinId: id, action })
      if (response === 'ok') {
        toast('✅ Status updated successfully', {
          duration: 2000
        })

        // TODO: improve this, maybe move supabase operations to server
        await revalidate()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  return {
    deletePin,
    updatePinStatus
  }
}
