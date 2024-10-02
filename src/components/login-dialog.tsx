'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation'
import { LogInIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
// import { getSession } from '@/services/auth-server'
import { LoginForm } from '@/components/login-form'

import { Button } from './ui/button'

export function LoginDialog() {
  // const {
  //   data: { session }
  // } = await getSession()
  // if (session) {
  //   return redirect('/dashboard')
  // }
  const [open, setOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>
          <LogInIcon className='size-4 mr-2' />
          <span>Sign In</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Securely access your account using your preferred method.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  )
}
