import { redirect } from 'next/navigation'
import { signOut } from '@/auth/server'
import { LogOut } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function LogoutForm() {
  const logout = async () => {
    'use server'
    await signOut()
    redirect('/')
  }

  return (
    <>
      <form action={logout}>
        <Button
          variant='ghost'
          className='p-0 m-0 w-auto h-auto bg-transparent hover:bg-transparent'
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </Button>
      </form>
    </>
  )
}
