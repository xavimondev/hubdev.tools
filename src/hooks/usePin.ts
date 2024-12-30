import { toast } from 'sonner'

import { createSupabaseBrowserClient } from '@/utils/supabase-client'
import { removePin, updateIsTopStatus } from '@/services/pins'
import { usePinsContext } from '@/app/provider/use-pins-context'

export function usePin() {
  const removePinState = usePinsContext((store) => store.removePinState)
  const updatePinState = usePinsContext((store) => store.updatePinState)

  const deletePin = async ({ id }: { id: string }) => {
    try {
      const response = await removePin({
        id
      })

      if (response === 'ok') {
        removePinState(id)
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

        updatePinState(id)
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
