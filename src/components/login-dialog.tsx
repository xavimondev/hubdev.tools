'use client'

import { LogInIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { LoginForm } from '@/components/login-form'

export function LoginDialog() {
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
