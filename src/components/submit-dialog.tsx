'use client'

import { useState } from 'react'
import { SendIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { SubmitResourceForm } from '@/components/submit-resource-form'

export function SubmitDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <SendIcon className='size-4 mr-2' />
          <span>Submit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Submit a resource</DialogTitle>
          <DialogDescription>
            Help grow our collection of valuable resources for developers. Submit a website, tool,
            or article that you find useful.
          </DialogDescription>
        </DialogHeader>
        <SubmitResourceForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
